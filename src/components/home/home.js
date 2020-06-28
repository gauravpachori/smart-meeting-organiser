// Home page with collection of data

import React from 'react';
import { connect } from 'react-redux';
import { getRefinedData } from './helper';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

const Home = ({data}) => {
    return (
        <div className = { styles.home }>
            <div className = { styles.wrapper }>
                <div className = { styles.card }>
                    <div>Buildings</div>
                    <div>Total { data.buildings.count }</div>
                </div>
                <div className = { styles.card }>
                    <div>Rooms</div>
                    <div>Total { data.rooms.count }</div>
                    <div>Free Now { data.rooms.freenow }</div>
                </div>
                <div className = { styles.card }>
                    <div>Meetings</div>
                    <div>Total { data.meetings.count } today</div>
                    <div>Total { data.meetings.going } Going on now</div>
                </div>
            </div>
            <Link to = '/add-meeting' className = 'button'>Add Meeting</Link>
        </div>
    )
}

const mapStateToProps = (store) => ({
    data: getRefinedData(store.data.data)
});

export default connect(mapStateToProps)(Home)