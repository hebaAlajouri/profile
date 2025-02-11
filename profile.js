"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        alert("Please log in first!");
        window.location.href = "./log.html";
        return;
    }

    let users = JSON.parse(localStorage.getItem("readers_log")) || [];
    let user = users.find(user => user.email === currentUser);

    if (!user) {
        alert("User not found!");
        localStorage.removeItem("currentUser");
        window.location.href = "./log.html";
        return;
    }

    // Populate fields
    document.getElementById("profile-name").value = user.username;
    document.getElementById("profile-email").value = user.email;

    // Display favorite books
    const favList = document.getElementById("fav-books-list");
    user.fav_books.forEach(book => {
        let li = document.createElement("li");
        li.textContent = book;
        favList.appendChild(li);
    });

    // Handle form submission
    document.getElementById("profile-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let newName = document.getElementById("profile-name").value;
        let newPassword = document.getElementById("profile-password").value;

        if (newName) user.username = newName;
        if (newPassword.length >= 8) user.password = newPassword;

        // Update in localStorage
        localStorage.setItem("readers_log", JSON.stringify(users));
        alert("Profile updated successfully!");
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "./log.html";
    });
});
