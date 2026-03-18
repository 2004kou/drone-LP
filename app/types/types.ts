export interface Post  {
  id: string
  title:string
  content:string
  image:string
  createdAt: string
}

export interface  EditPostFormProps  {
  post: {
    id:string,
    title: string;
    content: string;
    image:string;
  };
};


export interface ActionState  {
  success: boolean;
  errors: Record<string, string[]>;
};

