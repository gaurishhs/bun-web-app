window.addEventListener("DOMContentLoaded", function () {
    fetch("/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then((res) => res.json())
        .then((books) => {
            document.getElementById("bookList").innerHTML = books.map((book) => {
                return `
                <li id="${book.id}">
                    ID: ${book.id} <br> Name: ${book.name} <br> Author: ${book.author}
                </li>
            `
            }).join("");
        })
}, false);

const addNewBook = () => {
    const newBook = prompt("Book name & author (separated by a comma)");
    if (newBook) {
        const [name, author] = newBook.split(",");
        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, author }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById("bookList").innerHTML += `
                    <li id="${res.id}">
                        ID: ${res.id} Name: ${name} <br> Author: ${author}
                    </li>
                `
                }
            });
    }
};

const deleteBook = () => {
    const bookPrompt = prompt("Book ID");
    if (!bookPrompt) return alert("Invalid book ID");
    const bookId = parseInt(bookPrompt);
    if (bookId) {
        fetch(`/books/${bookId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    document.getElementById(bookId).remove();
                }
            });
    }
};

const updateBook = () => {
    const bookPrompt = prompt("Book ID");
    if (!bookPrompt) return alert("Invalid book ID");
    const bookId = parseInt(bookPrompt);
    if (bookId) {
        const newBook = prompt("Book name & author (separated by a comma)");
        if (newBook) {
            const [name, author] = newBook.split(",");
            fetch(`/books/${bookId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, author }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        document.getElementById(bookId).innerHTML = `
                        ID: ${bookId} <br> Name: ${name} <br> Author: ${author}
                    `
                    }
                });
        }
    }
};    