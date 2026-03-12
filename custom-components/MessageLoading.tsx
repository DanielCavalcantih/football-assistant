const MessageLoading = () => {
  return (
    <div className="flex items-center gap-2 p-3 w-fit rounded-xl bg-gray-200">
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
      <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
    </div>
  );
}

export default MessageLoading;
