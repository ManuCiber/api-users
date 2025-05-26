import { PostsRepository } from "repositories/PostRepositories";
import { PostsService } from "services/PostService";
import { Request, Response } from "express";
import { IPostsRepository, IPostsService, Posts } from "types/PostTypes";

const postsRepository: IPostsRepository = new PostsRepository();
const postsService: IPostsService = new PostsService(postsRepository);

export const findPosts = async (req: Request, res: Response) => {
  
  try {
    const searchedPost = await postsService.findPosts();
    res.status(201).json(searchedPost);
  } catch (error) {
    res.status(500).json({message: "Posts not found"});
    console.log(error);
  }
    
};

export const findPostsById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const Posts = await postsService.findPostsById(id);
    res.json(Posts);

  } catch (error) {
      res.status(500).json({message: "Post not found"});
      console.log(error);
  }
};

export const createPosts = async (req: Request, res: Response) => {
  try {
    const newRole: Posts = req.body;
    const result = await postsService.createPosts(newRole);
    res.status(201).json(result);    
  } catch (error) {
    res.status(400).json({message: "Error Internal Server"});
    console.log(error);
  }
};

export const updatePosts = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const postUpdated = await postsService.updatePosts(id, req.body);
    res.status(203).json(postUpdated);
  } catch (error) {
    res.status(500).json({message: "Error to Update Post !"});
    console.log(error);
  }
};

export const deletePosts = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    await postsService.deletePosts(id);
    res.status(204).json({message: "Post Deleted !"});
  } catch (error) {
    res.status(500).json({message: "Internal Error Server"});
    console.log(error);
  }
};