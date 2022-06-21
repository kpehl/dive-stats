const $backBtn = document.querySelector('#back-btn');
const $diverName = document.querySelector('#diver-name');
const $isInstructor = document.querySelector('#is-instructor');
const $certificationId = document.querySelector('#certification-id');
const $totalDives = document.querySelector('#total-dives');
const $allDivesList = document.querySelector('#all-dives-list');

let diverId;

const getDiverStats = () => {
    const searchParams = new URLSearchParams(document.location.search.substring(1));
    const diverId = searchParams.get('id');

    fetch(`/api/divers/${diverId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error({ message: 'Something went wrong!'})
        }

        return response.json();
    })
    .then(printDiver)
    .catch(err => {
        console.error(err);
        alert('Could not find a diver with this id. Taking you back to your previous page.');
        window.history.back();
    });
}

function printDiver(diverData) {
    diverId = diverData.id;
    $diverName.textContent = diverData.first_name + ' ' + diverData.last_name;
    $isInstructor.innerText = 'Instructor: ' + (diverData.is_instructor ? 'Yes' : 'No');
    $certificationId.innerText = 'Certification: ' + diverData.cert_name;
}

const getTotalDives = () => {
    const searchParams = new URLSearchParams(document.location.search.substring(1));
    const diverId = searchParams.get('id');

    fetch(`/api/divers/${diverId}/stats?data=total_dives`)
    .then(response => {
        if (!response.ok) {
            throw new Error({ message: 'Something went wrong!'})
        }

        return response.json();
    })
    .then(printTotalDives)
    .catch(err => {
        console.error(err);
        alert('Could not find a diver with this id. Taking you back to your previous page.');
        window.history.back();
    });
}

function printTotalDives(totalDivesData) {

    const totalDivesDiv = document.createElement('div');
    totalDivesDiv.classList.add('my-2', 'card', 'p-2', 'w-100', 'text-dark', 'rounded');
    
    const totalDivesContent = `
        <div class="card p-2 rounded bg-primary">
            <p>Total Dives: ${totalDivesData.number_of_dives}</p>
        </div>
    `;

    totalDivesDiv.innerHTML = totalDivesContent;
    $totalDives.prepend(totalDivesDiv);
    
}

const getAllDives = () => {
    const searchParams = new URLSearchParams(document.location.search.substring(1));
    const diverId = searchParams.get('id');

    fetch(`/api/dives/${diverId}/bydiver/`)
    .then(response => {
        if (!response.ok) {
            throw new Error({ message: 'Something went wrong!'})
        }

        return response.json();
    })
    .then(printAllDives)
    .catch(err => {
        console.error(err);
        alert('Could not find a diver with this id. Taking you back to your previous page.');
        window.history.back();
    });
}

function printAllDives(allDivesData) {

    $allDivesList.innerHTML = allDivesData.map(dive => `
        <div class='card p-2 rounded'>
            <h4 class="text-center text-dark">${dive.name}</h4>
            <h6 class="text-center text-dark">(${dive.coordinates.x}° latitude, ${dive.coordinates.y}° longitude)</h6>
            <ul>
            <li>Date: ${new Date(dive.dive_date).toDateString()}</li>
            <li>Duration: ${dive.duration}</li>
            <li>Depth: ${dive.depth}</li>
            </ul>
        </div>
    `)
    .join('');

}

$backBtn.addEventListener('click', function() {
    window.history.back();
  });

getDiverStats();
getTotalDives();
getAllDives();