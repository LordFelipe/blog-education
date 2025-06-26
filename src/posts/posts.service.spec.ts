import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PostMongooseRepository } from './repository/mongoose/post.mongoose.repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Post, PostDocument, PostSchema } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from './repository/post.repository';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsService', () => {
  let module: TestingModule;
  let service: PostsService;
  let mongod: MongoMemoryServer;
  let postModel: Model<PostDocument>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: mongod.getUri(),
          }),
        }),
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
      ],
      providers: [
        PostsService,
        PostMongooseRepository,
        { provide: PostRepository, useExisting: PostMongooseRepository },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postModel = module.get<Model<PostDocument>>(getModelToken(Post.name));
  });

  afterAll(async () => {
    await module.close();
    await mongod.stop();
  });

  afterEach(async () => {
    await postModel.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a post and then find it', async () => {
    // 1) criar
    const postInput: CreatePostDto = {
      title: 'Integration Test',
      description: 'Testing with real mongodb, but in memory',
      image: 'img.png',
      isPublished: true,
    };
    const created = await service.create(postInput);

    expect(created).toHaveProperty('id');
    expect(created.title).toBe('Integration Test');

    // 2) buscar publicado
    const published = await service.findAllPublished();
    expect(published).toHaveLength(1);
    expect(published[0].title).toBe('Integration Test');

    // 3) buscar paginado
    const all = await service.findAll(10, 1);
    expect(all).toHaveLength(1);

    if (created.id) {
      // 4) buscar por id
      const one = await service.findOne(created.id);
      expect(one).not.toBeNull();
      expect(one!.title).toBe('Integration Test');

      // 5) atualizar
      const updated = await service.update(created.id, {
        title: 'Updated Title',
      });
      expect(updated).not.toBeUndefined();
      expect(updated!.title).toBe('Updated Title');

      // 6) search
      const searchResults = await service.search('Updated Title');
      expect(searchResults).toHaveLength(1);

      // 7) remover
      await service.remove(created.id);
      const afterRemove = await service.findOne(created.id);
      expect(afterRemove).toBeNull();
    }
  });
});
