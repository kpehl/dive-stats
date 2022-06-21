const $diverList = document.querySelector('#diver-list');

const getDiverList = () => {
    fetch('/api/divers')
    .then(response => response.json())
    .then(diverListArray => {
        diverListArray.forEach(printDiver);
    })
    .catch(err => {
        console.error(err)
    });
};

const printDiver = ({ id, first_name, last_name, is_instructor, cert_name }) => {
    const isInstructor = is_instructor ? 'Yes' : 'No';
    const diverCard = `
        <div class="col-12 col-lg-6 flex-row">
            <div class="card w-100 flex-column">
                <h3 class="card-header">${first_name} ${last_name}</h3>
                <div class="card-body flex-column col-auto">
                    <p class="text-dark">Instructor? ${isInstructor}</p>
                    <p>Certification: ${cert_name}</p>
                    <p><a href="/diver?id=${id}">See more stats</a></p>
                </div>
            </div>
        </div>
    `;
    $diverList.innerHTML += diverCard;
};

getDiverList();