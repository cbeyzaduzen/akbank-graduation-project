export type UserRes = {
  id: number
  boardId: number
  userId: number
  updatedAt: string
  createdAt: string
}

export type IntertwinedUserRes = {
  id: number
  username: string
  createdAt: string
  updatedAt: string
  BoardMember: MemberResponse
}

export type UserRequest = {
  boardId: number
  username: string
}

export type UserListRes = {
  id: number
  createdAt: string
  updatedAt: string
  boardId: number
  userId: number
  board: {
    id: number
    title: string
    createdAt: string
    updatedAt: string
    ownerId: number
  },
  user: {
    id: number
    username: string
    createdAt: string
    updatedAt: string
  }
}