// helper function to get the view data

export const getRefinedData = (data) => {
    const buildingKeys = Object.keys(data);
    const today = new Date();
    const meetingKey = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
    const currTime = today.getHours().toString().padStart(2, '0');
    let roomcount = 0,
        roomFree = 0,
        meetingCount = 0,
        meetingGoing = 0;

    buildingKeys.forEach(el => {
        const rooms = data[el];
        roomcount += Object.keys(rooms).length;
        Object.keys(rooms).forEach(room => {
            if (rooms[room][meetingKey]) {
                meetingCount += rooms[room][meetingKey].length;
                const prevHr = meetingGoing;
                rooms[room][meetingKey].forEach(hrs => {
                    if (hrs.indexOf(currTime+':') === 0) {
                        meetingGoing++;
                    }
                })
                if (prevHr === meetingGoing) {
                    roomFree++;
                }
            } else {
                roomFree++;
            }
        })
    })

    return {
        buildings: {
            count: buildingKeys.length,
            names: buildingKeys
        },
        rooms: {
            count: roomcount,
            freenow: roomFree
        },
        meetings: {
            count: meetingCount,
            going: meetingGoing
        }
    };
}
