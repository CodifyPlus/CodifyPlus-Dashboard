export const handleLogout = (navigate) => {
  localStorage.removeItem("user");
  // navigate to the login page
  navigate("/login");
  window.location.reload();
};
