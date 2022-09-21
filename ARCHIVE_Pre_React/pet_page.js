document.querySelector("#delete-pet").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete your pet? This action is irreversible.")) {
        fetch("/delete-pet")
            .then((response) => response.json())
            .then((msg) => {
                alert(msg)
            })
    } else {
        alert("Your pet has not been deleted.");
    }
})