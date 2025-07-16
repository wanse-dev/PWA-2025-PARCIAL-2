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
    console.debug("Error parsing stored user:", error);
    return null;
  }
};

export const setStoredUser = (response : any) => {
  try {
    localStorage.setItem("user", JSON.stringify(response));
  } catch (error) {
    console.debug("Error storing user:", error);
    return null;
  }
};

export const removeStoredUser = (user : string) => {
  try {
    localStorage.removeItem(user);
  } catch (error) {
    console.debug("Error removing user:", error);
    return null;
  }
}