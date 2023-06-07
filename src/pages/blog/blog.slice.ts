import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { Post } from "../../types/blog.type";
import { initialPostlist } from "../../contants/blog";

interface BlogState {
  postList: Post[];
  editPost: Post | null;
}

const initialState: BlogState = {
  postList: initialPostlist,
  editPost: null,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers:{
      addPost: (state, action: PayloadAction<Post>) => {
        const post = action.payload;
        state.postList.push(post);
      },
      deletePost: (state, action: PayloadAction<string>) => {
        const postId = action.payload;
        const deletePostWithId = state.postList.findIndex(
          (post) => post.id === postId
        );
        if (deletePostWithId !== -1) {
          state.postList.splice(deletePostWithId, 1);
        }
      },
      startEditingPost: (state, action: PayloadAction<string>) => {
        const postId = action.payload;
        const editPostWithId =
          state.postList.find((post) => post.id === postId) || null;
        state.editPost = editPostWithId;
      },
      finishEditingPost: (state, action: PayloadAction<Post>) => {
        const postId = action.payload.id;
        const index = state.postList.findIndex((post) => post.id === postId);
        if (index !== -1) {
          state.postList[index] = action.payload;
        }
        state.editPost = null;
      },
      cancelEditing: (state) => {
        state.editPost = null;
      }
    },
    // extraReducers(builder){}
})

// export const addPost = createAction<Post>("blog/addPost");
// export const deletePost = createAction<string>("blog/deletePost");
// export const startEditingPost = createAction<string>("blog/updatePost");
// export const cancelEditing = createAction("blog/cancelEditing");
// export const finishEditingPost = createAction<Post>("blog/finishEditingPost");

// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addPost, (state, action) => {
//       const post = action.payload;
//       state.postList.push(post);
//     })
//     .addCase(deletePost, (state, action) => {
//       const postId = action.payload;
//       const deletePostWithId = state.postList.findIndex(
//         (post) => post.id === postId
//       );
//       if (deletePostWithId !== -1) {
//         state.postList.splice(deletePostWithId, 1);
//       }
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const postId = action.payload;
//       const editPostWithId =
//         state.postList.find((post) => post.id === postId) || null;
//       state.editPost = editPostWithId;
//     })
//     .addCase(cancelEditing, (state) => {
//       state.editPost = null;
//     })
//     .addCase(finishEditingPost, (state, action) => {
//       const postId = action.payload.id;
//       const index = state.postList.findIndex((post) => post.id === postId);
//       if (index !== -1) {
//         state.postList[index] = action.payload;
//       }
//       state.editPost = null;
//     });
// });
export const {addPost, cancelEditing, deletePost, startEditingPost,  finishEditingPost} = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer;
