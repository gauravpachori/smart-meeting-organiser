import * as types from './types';
import store from './index';
import { getFromLocalStorage, storeToLocalStorage } from '../components/storage';

// static data
const initData = {
    Pyramid: { RoomE: {floor: 1}, RoomG: {floor: 2, '2020-06-28': ['09:00-10:00', '11:30-12:00']}, RoomY: {floor: 3}, RoomP: {floor: 4}, RoomT: {floor: 5} },
    Babylon: { RoomG: {floor: 1}, RoomA: {floor: 2}, RoomR: {floor: 3}, RoomD: {floor: 4}, RoomE: {floor: 5}, RoomN: {floor: 6} },
    Olumpia: { RoomZ: {floor: 1}, RoomE: {floor: 2}, RoomU: {floor: 3}, RoomS: {floor: 4} },
    Ephesus: { RoomT: {floor: 1}, RoomE: {floor: 2}, RoomM: {floor: 3}, RoomP: {floor: 4}, RoomL: {floor: 5} },
    Mausoleum: { RoomH: {floor: 1}, RoomA: {floor: 2}, RoomL: {floor: 3}, RoomI: {floor: 4} },
    Colossus: { RoomR: {floor: 1}, RoomH: {floor: 2}, RoomO: {floor: 3}, RoomD: {floor: 4}, RoomE: {floor: 5}, RoomS: {floor: 6} },
    Lighthouse: { RoomA: {floor: 1}, RoomL: {floor: 2}, RoomE: {floor: 3}, RoomX: {floor: 4} }
}

// Set data in redux initially from local storage
export const init = () => (dispatch => {
    const data = getFromLocalStorage('smart-meeting-organiser');
    if (Object.keys(data).length > 0) {
        dispatch(updateMeeting(data));
    } else {
        storeToLocalStorage('smart-meeting-organiser', initData);
        dispatch(updateMeeting(initData));
    }
})

// validate & schedule meeting
export const scheduleMeeting = (building, room, date, startTime, endTime, history) => (dispatch => {
    if (!date) {
        alert('Please select date!');
        return;
    }

    if (!startTime) {
        alert('Please select starting time!');
        return;
    }

    if (!endTime) {
        alert('Please select end time!');
        return;
    }

    if (!room) {
        alert('Please select room!');
        return;
    }

    if(startTime >= endTime) {
        alert('Please select correct start & end time!');
        return;
    }

    const data = store.getState().data.data;
    if (data[building][room][date]) {
        const arr = data[building][room][date];

        for (const el of arr) {
            const start = el.split('-')[0];
            const end = el.split('-')[1];
            if ((startTime >= start && startTime < end) || (endTime >= start && endTime < end)) {
                alert('Already a meeting is scheduled. Please select other time');
                return;
            }
        }

        data[building][room][date].push(startTime + '-' + endTime);
    } else {
        data[building][room][date] = [startTime + '-' + endTime]
    }
    dispatch(updateMeeting(data));
    storeToLocalStorage('smart-meeting-organiser', data);
    history.goBack();
    alert('Meeting scheduled successfully!');
})

// dispatch action to update reducer
export const updateMeeting = (data) => ({
    type: types.UPDATE_MEETING,
    data
})