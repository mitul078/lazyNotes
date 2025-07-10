const displayNotes = document.querySelector(".display-notes")
const colors = ["lightsalmon", "lightgray", "lightgreen", "lightpink", "lightslategrey", "lightsteelblue"];

async function getNotes() {
    const loading = document.querySelector(".spinner")
    try {
        const res = await fetch("https://lazy-notes.onrender.com/notes")
        const data = await res.json()
        let cluster = ""

        if (data.notes.length === 0) {
            displayNotes.innerHTML = "<span>NO Notes </span>"
        }
        else {
            data.notes.forEach((note, index) => {
                const bgColor = colors[index % colors.length];
                cluster += ` <div class="box" style="background-color : ${bgColor}">
                    <div class="title">
                        <h1>${note.title}</h1>
                        <i class="delete ri-delete-bin-6-line" onclick="removeNote('${note._id}')"></i>
                    </div>
                    <div class="content">
                        <p>${note.content}</p>
                    </div>
                </div>`
            })
            displayNotes.innerHTML = cluster
        }
    } catch (error) {
        console.log(error)
    } finally {
        loading.style.display = "none";
    }

}
getNotes()


async function addNote(e) {
    e.preventDefault()
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    try {
        await fetch("https://lazy-notes.onrender.com/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        })
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        getNotes();
    } catch (error) {
        console.log(error)
    }
}


const submitNote = document.querySelector(".submit")
submitNote.addEventListener("click", addNote)


async function removeNote(id) {
    try {
        await fetch(`https://lazy-notes.onrender.com/notes/${id}`, {
            method: "DELETE"
        })
        getNotes()
    } catch (error) {
        console.log(error)
    }
}



