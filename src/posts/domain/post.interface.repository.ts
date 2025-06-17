// src/posts/domain/iposts.repository.ts
import { Post } from './post.entity';
import { IPost } from './post.interface';

/**
 * Interface que define as operações de persistência de Post.
 * Permite desacoplar a camada de domínio da implementação concreta de banco.
 */
export interface IPostsRepository {
  /**
   * Retorna todos os posts.
   * @param publishedOnly Se true, retorna apenas posts publicados.
   */
  findAll(publishedOnly?: boolean): Promise<IPost[]>;

  /**
   * Retorna um post pelo seu ID.
   * @param id Identificador único do post.
   */
  findById(id: string): Promise<IPost | undefined>;

  /**
   * Busca posts por palavra-chave no título ou conteúdo.
   * @param term Termo a ser buscado.
   */
  search(term: string): Promise<IPost[]>;

  /**
   * Persiste um novo post.
   * @param post Entidade de domínio com os dados do post.
   */
  create(post: IPost): Promise<IPost>;

  /**
   * Atualiza um post existente.
   * @param id ID do post a ser atualizado.
   * @param post Dados parciais para atualização.
   */
  update(id: string, post: Partial<IPost>): Promise<IPost>;

  /**
   * Remove um post pelo ID.
   * @param id Identificador do post.
   */
  delete(id: string): Promise<void>;
}
