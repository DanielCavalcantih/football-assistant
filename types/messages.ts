export interface MessageType {
  id?: number;
  user_id?: number;
  message: string;
  type: string;
}

export interface MessageProps {
    message: string;
    type: string;
}