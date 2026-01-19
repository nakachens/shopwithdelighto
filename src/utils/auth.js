// Authentication utility functions for Shoppo Deligto

const AUTH_STORAGE_KEY = 'shoppo_users';
const CURRENT_USER_KEY = 'shoppo_current_user';

// Get all users from localStorage
export const getAllUsers = () => {
  const users = localStorage.getItem(AUTH_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = (name, email, password) => {
  const users = getAllUsers();
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    return { success: false, error: 'Email already registered' };
  }
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In production, this should be hashed!
    bio: '',
    profilePicture: '',
    memberSince: new Date().toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  // Auto-login the new user
  const { password: _, ...userWithoutPassword } = newUser;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return { success: true, user: userWithoutPassword };
};

// Login user
export const loginUser = (email, password) => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store current user (without password)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Update user profile
export const updateUserProfile = (userId, updates) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  // Update user data (preserve password and other fields)
  users[userIndex] = { 
    ...users[userIndex], 
    ...updates,
    // Ensure we don't accidentally overwrite critical fields
    id: users[userIndex].id,
    email: users[userIndex].email,
    password: users[userIndex].password,
    memberSince: users[userIndex].memberSince,
    createdAt: users[userIndex].createdAt
  };
  
  saveUsers(users);
  
  // Update current user in localStorage
  const { password: _, ...userWithoutPassword } = users[userIndex];
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  
  return { success: true, user: userWithoutPassword };
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

// Get user by ID (useful for admin features)
export const getUserById = (userId) => {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Delete user account
export const deleteUserAccount = (userId) => {
  const users = getAllUsers();
  const filteredUsers = users.filter(u => u.id !== userId);
  saveUsers(filteredUsers);
  
  // If deleting current user, logout
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    logoutUser();
  }
  
  return { success: true };
};

// Change password
export const changePassword = (userId, oldPassword, newPassword) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  // Verify old password
  if (users[userIndex].password !== oldPassword) {
    return { success: false, error: 'Incorrect current password' };
  }
  
  // Update password
  users[userIndex].password = newPassword;
  saveUsers(users);
  
  return { success: true };
};