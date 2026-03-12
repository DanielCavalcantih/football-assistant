export interface MessageType {
  id?: number;
  user_id?: number;
  message: string;
  type: string;
  created_at?: string;
}

export interface MessageProps {
    chat: MessageType;
}