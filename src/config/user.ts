type User = {
  _id?: string;
  username: string;
  email: string;
  isActive: boolean;
};

export const getStoredUser = (): User | null => { 
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
};

export const setStoredUser = (response : any) => {
  try {
    localStorage.setItem("user", JSON.stringify(response));
  } catch (error) {
    console.error("Error storing user:", error);
    return null;
  }
};
