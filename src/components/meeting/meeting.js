// Scheduling page with inputs from user for getting data

import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './meeting.module.css';
import { scheduleMeeting } from '../../redux/action';

const Meeting = ({ data, scheduleMeeting, history }) => {
    const buildingNames = Object.keys(data);

    const [building, setBuilding] = useState(buildingNames[0]);
    const [roomsList, setRoomsList] = useState(Object.keys(data[building]));
    const [rooms, setRooms] = useState('');

    const dateRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    const selBuilding = (val) => {
        setBuilding(val);
        setRoomsList(Object.keys(data[val]));
        setRooms('')
    }

    const saveMeeting = () => {
        const date = dateRef.current.value;
        const startTime = startTimeRef.current.value;
        const endTime = endTimeRef.current.value;

        scheduleMeeting(building, rooms, date, startTime, endTime, history);
    }

    return (
        <div className = { styles.home }>
            <h2>Add Meeting</h2>
            <div className = { styles.wrapper }>
                <div>
                    <label>Date</label>
                    <input type = 'date' ref = { dateRef } />
                </div>
                <div>
                    <label>Start Time</label>
                    <input type = 'time' ref = { startTimeRef } />
                </div>
                <div>
                    <label>End Time</label>
                    <input type = 'time' ref = { endTimeRef } />
                </div>
                <div className = { styles.buildingContainer }>
                    <label>Select Building</label>
                    <div className = { styles.buildingWrapper }>
                        {
                            buildingNames.map(el => (
                                <div
                                    key = { el }
                                    className = { building === el ? `${styles.building} ${styles.active}` : styles.building }
                                    onClick = { () => selBuilding(el) }
                                >{ el }</div>
                            ))
                        }
                    </div>
                </div>
                <div className = { styles.buildingContainer }>
                    <label>Select Rooms</label>
                    <div className = { styles.buildingWrapper }>
                        {
                            roomsList.map(el => (
                                <div
                                    key = { el }
                                    className = { rooms === el ? `${styles.building} ${styles.room} ${styles.active}` : `${styles.building} ${styles.room}` }
                                    onClick = { () => setRooms(el) }
                                >
                                    <div>{ el }</div>
                                    <div>Building { building }</div>
                                    <div>Floor { data[building][el].floor }</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <button className = 'button' onClick = { saveMeeting }>Save</button>
        </div>
    )
}

const mapStateToProps = (store) => ({
    data: store.data.data
});

const mapDispatchToProps = {
    scheduleMeeting: scheduleMeeting
}

export default connect(mapStateToProps, mapDispatchToProps)(Meeting)