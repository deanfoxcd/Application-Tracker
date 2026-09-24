export type Application = {
  id: number
  userId: number
  companyName: string
  position: string
  status: string
  dateApplied: string
  jobUrl?: string
  createdAt: string
  updatedAt: string
}

export type CreateApplicationInput = {
  companyName: string
  position: string
  dateApplied: string
  jobUrl?: string
}

export type UpdateApplicationInput = {
  companyName: string;
  position: string;
  status: string;
  dateApplied: string;
  jobUrl?: string;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
};

export type Note = {
  id: number;
  jobApplicationId: number;
  content: string;
  createdAt: string;
};

export type CreateNoteInput = {
  jobApplicationId: number;
  content: string;
};

export type UpdateNoteInput = {
  content: string;
};