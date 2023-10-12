let no_of_floors = document.getElementById('floors');
let no_of_lifts = document.getElementById('lifts');
let form = document.querySelector('.container1')
let liftpage = document.querySelector('.liftpage')
let appartment = document.querySelector('.appartment')
let floors;
let lifts;
let lifts_info = [];
let lift_requests = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log("Hello")
    validateInputs();
    form.classList.add('hide');
    liftpage.classList.remove('hide');
    createBuilding(floors, lifts);
    // initially();
});

function goBack() {
    form.classList.remove('hide');
    liftpage.classList.add('hide');
    appartment.innerHTML = '';
    lifts_info = [];
    lift_requests = [];
}


const validateInputs = () => {
    floors = parseInt(no_of_floors.value);
    lifts = parseInt(no_of_lifts.value);

    console.log(`No of floors are ${floors}`)
    console.log(`No of lifts are ${lifts}`)

    if ((lifts === "" || lifts < 1 || lifts > 10) && (floors > 20 || floors < 2 || floors === "")) {
        alert("Please Enter Valid No Of Lifts and Floors")
        return;
    }

    else if (lifts > floors) {
        alert("Lifts Cant be more than Floors")
        return;
    }

    else if (lifts === "" || lifts < 1 || lifts > 10) {
        alert("Please Enter Valid No Of Lifts");
        return;
    }

    else if (floors > 20 || floors < 2 || floors === "") {
        alert("Please Enter Valid No Of Floors")
        return;
    }
}

function createBuilding() {

    for (let floor = floors; floor >= 0; floor--) {
        let One_floor = document.createElement('div');
        One_floor.classList.add('floor');
        One_floor.classList.add(`floor-${floor}`)
        One_floor.setAttribute('floor', floor);
        if (floor == 0) {
            One_floor.setAttribute("id", `Floor-${floor}`);
        }
        let btn_wrap = document.createElement('div');
        btn_wrap.classList.add('btn_wrap');

        let up_btn = document.createElement('button');
        let down_btn = document.createElement('button');

        up_btn.classList.add('btn', 'up_btn');
        down_btn.classList.add('btn', 'down_btn');



        up_btn.id = `UP-${floor}`;
        down_btn.id = `Down-${floor}`;


        up_btn.addEventListener('click', this.callingLift);
        down_btn.addEventListener('click', this.callingLift)


        if (floor !== floors) btn_wrap.appendChild(up_btn);
        if (floor !== 0) btn_wrap.appendChild(down_btn);

        let floor_name = document.createElement('h5');
        floor_name.classList.add('label');
        floor_name.textContent = `Floor ${floor}`;
        One_floor.appendChild(btn_wrap);

        One_floor.appendChild(floor_name);
        appartment.appendChild(One_floor);
    }


    let One_lift;

    let targetFloorNo = document.querySelector(".floor-0");
    // console.log(targetFloorNo);
    for (let lift = lifts; lift > 0; lift--) {

        One_lift = document.createElement("div")
        One_lift.style.cssText = "height:100%; min-width:60px; border:2px solid grey; display:flex;overflow: hidden; "
        One_lift.setAttribute("id", `floorid-${lift}`)
        let left = document.createElement("div")
        left.setAttribute("id", `left-door-${lift}`)

        left.classList.add("leftLift")

        let right = document.createElement("div")
        right.setAttribute("id", `right-door-${lift}`)
        // right.style.cssText="
        right.classList.add("rightlift")
        One_lift.appendChild(left)

        One_lift.appendChild(right)
        // One_floor.appendChild(One_lift);
        targetFloorNo.appendChild(One_lift);

        const liftData = {
            id: lift,
            isMoving: false,
            currentFloor: 0,
            Destination: null,
            isGateOpening: false
        }


        lifts_info.push(liftData)
        setInterval(() => {
            ScheduleLift();
        }, 1000)

    }

}


function isLiftMovingToThatFloor(next_floor) {
    let boolean = false;
    for (let liftIndex = 0; liftIndex < lifts_info.length; liftIndex++) {
        const lift = lifts_info[liftIndex];
        console.log(Number(lift.Destination));
        if (Number(lift.Destination) == next_floor) {
            boolean = true;
        }
    }
    return boolean;
}


//Calling the lift 

function callingLift(event) {
    let id = event.target.id;
    // console.log(id);                                //comment
    let next_floor = id.split("-")[1];
    next_floor = Number(next_floor);
    if (isLiftMovingToThatFloor(next_floor)) {
        console.log("already exist floor");
    }
    else {
        console.log("lift going");

        lift_requests.push(Number(next_floor));
        // console.log(Number(next_floor))                   //comment
    }
    return;
}


//Finding nearest lift for floor

const findLift = (next_floor) => {
    let distance = floors;
    next_floor = Number(next_floor);

    let nearestLift;
    let all_lifts = lifts_info;

    for (let idx = 0; idx < lifts_info.length; idx++) {
        const lift = all_lifts[idx];
        if (Math.abs(lift.currentFloor - next_floor) < distance && lift.isMoving === false && lift.isGateOpening == false) {
            distance = Math.abs(lift.currentFloor - next_floor);
            nearestLift = lift.id;
        }
    }

    let allLift = [];
    for (let i = 0; i < lifts_info.length; i++) {
        const lift = all_lifts[i];
        if (Math.abs(lift.currentFloor - next_floor) == distance && lift.isMoving === false && lift.isGateOpening == false) {
            allLift.push(Number(lift.id))
        }
    }

    if (allLift && allLift.length > 0) {
        const randomIndex = Math.floor(Math.random() * allLift.length);
        let lift = allLift[randomIndex]
        nearestLift = lift;
    }
    // console.log("doint my best",{allLift})

    return nearestLift;

}

//Finding Lift at that floor
const findLiftAtFloor = (next_floor) => {
    // console.log("Inside function findLiftAtFloor");              //comment
    let allLift = []
    next_floor = Number(next_floor)
    // console.log(next_floor);
    let nearestliftId;

    for (let idx = 0; idx < lifts_info.length; idx++) {
        const lift = lifts_info[idx];
        // console.log(lift)
        if (Number(lift.currentFloor) == next_floor && lift.isMoving === false) {
            // nearestLiftDistance=0
            // nearestliftId = lift.id;
            // nearestliftId=Number(nearestliftId)
            // console.log("Hello");
            allLift.push(Number(lift.id))
        }
    }

    // for (let i = 0; i < allLift.length; i++) {

    //     console.log(allLift[i]);
    // }

    if (allLift && allLift.length > 0) {
        const randomIndex = Math.floor(Math.random() * allLift.length);
        let lift = allLift[randomIndex]
        nearestliftId = lift;
    }
    // console.log(nearestliftId);
    return nearestliftId;
}

// function moveLift(distbtnFloor, next_floor, One_lift) {
//     if (next_floor > floors || next_floor < 0) return;
//     const liftHeight = One_lift.firstElementChild.offsetHeight;
//     One_lift.style.transform = `translateY(-${next_floor * (liftHeight + 2)}px)`
//     One_lift.style.transition = `transform ${2 * distbtnFloor}s ease`;
// }


// Lift Handling

async function handleLift(door, next_floor) {
    const Currentlift = lifts_info.find((lift) => lift.id == door);
    let from = Currentlift.currentFloor
    Currentlift.Destination = next_floor;
    const distance = -1 * (next_floor - 1) * 50;

    const time = Math.abs(from - next_floor) * 2;


    const temp = -1 * (next_floor / floors) * 100;
    console.log(temp);

    // console.log(from, next_floor)

    // const distbtnFloor = Math.abs(next_floor - from);
    // moveLift(distbtnFloor, next_floor, Currentlift);


    Currentlift.isMoving = true;
    let lift = document.querySelector(`#floorid-${door}`)
    // console.log({ lift })
    lift.style.transform = `translateY(${temp}%)`;
    // lift.style.bottom = `${temp}%`
    lift.style.transition = `transform ${time}s`

    const leftDoor = document.querySelector(`#left-door-${door}`)
    const rightDoor = document.querySelector(`#right-door-${door}`)
    setTimeout(() => {

        leftDoor.classList.add("openLeftDoor")
        rightDoor.classList.add("openrightDoor")
        Currentlift.currentFloor = next_floor;
        Currentlift.isMoving = false;

        Currentlift.isGateOpening = true
    }, time * 1000)


    setTimeout(() => {
        leftDoor.classList.remove("openLeftDoor")
        rightDoor.classList.remove("openrightDoor")
        Currentlift.isGateOpening = false
        Currentlift.Destination = null;

    }, time * 1000 + 5000)
}

//Opening Closing Door

async function openCLosedLift(door) {
    const Currentlift = lifts_info.find((lift) => lift.id == door);
    const leftDoor = document.querySelector(`#left-door-${door}`);
    const rightDoor = document.querySelector(`#right-door-${door}`);

    setTimeout(() => {
        leftDoor.classList.add("openLeftDoor");
        rightDoor.classList.add("openrightDoor");
        Currentlift.isGateOpening = true;
    }, 1000);
    setTimeout(() => {
        leftDoor.classList.remove("openLeftDoor");
        rightDoor.classList.remove("openrightDoor");
        Currentlift.isGateOpening = false;
    }, 6000);
}




//Schedule a lift for a floor

const ScheduleLift = () => {

    // console.log("Inside ScheduleLift Function");
    if (lift_requests.length === 0) {
        // console.log("No request for now");            //comment
        return;
    }
    const next_floor = lift_requests.shift();
    // console.log(next_floor)                                  //comment
    if (isLiftMovingToThatFloor(next_floor)) {
        console.log("False");                                    //comment
        return
    }

    let nearestLift;
    let nearestLiftAtFloor = findLiftAtFloor(next_floor);
    // console.log(nearestLiftAtFloor)
    if (nearestLiftAtFloor) {
        nearestLift = nearestLiftAtFloor
        openCLosedLift(nearestLift)
        return
    }
    else {
        let liftId = findLift(next_floor)
        console.log(liftId);
        if (liftId) {
            nearestLift = liftId
        }
    }

    if (!nearestLift) {
        lift_requests.unshift(next_floor);
        return;
    }
    handleLift(nearestLift, next_floor);
}


