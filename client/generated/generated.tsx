import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  findUsers: Array<User>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  fetchPosts?: Maybe<Array<Post>>;
  fetchPost?: Maybe<Post>;
  fetchComment?: Maybe<Array<Comment>>;
  deletePost: Scalars['Boolean'];
};


export type QueryFetchPostsArgs = {
  postId?: Maybe<Scalars['Float']>;
  blogId: Scalars['Float'];
};


export type QueryFetchPostArgs = {
  postId?: Maybe<Scalars['Float']>;
};


export type QueryFetchCommentArgs = {
  postId: Scalars['Float'];
  blogId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  userId: Scalars['Float'];
  title: Scalars['String'];
  details: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  Likes?: Maybe<Array<Like>>;
  blogId: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  details?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  blogId: Scalars['Float'];
};

export type Like = {
  __typename?: 'Like';
  userId: Scalars['Float'];
  hasLiked: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  createPost: Post;
  postComment?: Maybe<Post>;
  createBlog?: Maybe<Blog>;
  likePost?: Maybe<Like>;
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreatePostArgs = {
  blogId: Scalars['Float'];
  details: Scalars['String'];
  title: Scalars['String'];
};


export type MutationPostCommentArgs = {
  postId: Scalars['Float'];
  blogId: Scalars['Float'];
  details: Scalars['String'];
};


export type MutationCreateBlogArgs = {
  name: Scalars['String'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Float'];
};

export type Blog = {
  __typename?: 'Blog';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LikeMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & { likePost?: Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'userId' | 'hasLiked'>
  )> }
);

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PostCommentMutationVariables = Exact<{
  details: Scalars['String'];
  blogId: Scalars['Float'];
  postId: Scalars['Float'];
}>;


export type PostCommentMutation = (
  { __typename?: 'Mutation' }
  & { postComment?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'blogId' | 'details' | 'userId'>
    & { comments?: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'details' | 'username'>
    )>> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type FetchPostQueryVariables = Exact<{
  postId?: Maybe<Scalars['Float']>;
}>;


export type FetchPostQuery = (
  { __typename?: 'Query' }
  & { fetchPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'userId' | 'blogId' | 'title' | 'details'>
    & { comments?: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'details' | 'username'>
    )>> }
  )> }
);

export type PostsQueryVariables = Exact<{
  blogId: Scalars['Float'];
  postId?: Maybe<Scalars['Float']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { fetchPosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'blogId' | 'id' | 'title' | 'details'>
    & { comments?: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'details' | 'username'>
    )>>, Likes?: Maybe<Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'userId' | 'hasLiked'>
    )>> }
  )>> }
);


export const LikeDocument = gql`
    mutation Like($id: Float!) {
  likePost(postId: $id) {
    userId
    hasLiked
  }
}
    `;

export function useLikeMutation() {
  return Urql.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument);
};
export const LoginUserDocument = gql`
    mutation LoginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    username
    id
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const PostCommentDocument = gql`
    mutation PostComment($details: String!, $blogId: Float!, $postId: Float!) {
  postComment(details: $details, blogId: $blogId, postId: $postId) {
    id
    blogId
    details
    userId
    comments {
      details
      username
    }
  }
}
    `;

export function usePostCommentMutation() {
  return Urql.useMutation<PostCommentMutation, PostCommentMutationVariables>(PostCommentDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    username
    id
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const FetchPostDocument = gql`
    query FetchPost($postId: Float) {
  fetchPost(postId: $postId) {
    id
    userId
    blogId
    title
    details
    comments {
      details
      username
    }
  }
}
    `;

export function useFetchPostQuery(options: Omit<Urql.UseQueryArgs<FetchPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FetchPostQuery>({ query: FetchPostDocument, ...options });
};
export const PostsDocument = gql`
    query posts($blogId: Float!, $postId: Float) {
  fetchPosts(blogId: $blogId, postId: $postId) {
    blogId
    id
    title
    details
    comments {
      details
      username
    }
    Likes {
      userId
      hasLiked
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};