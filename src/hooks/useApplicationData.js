import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  // Initial state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Updates day when days are switched
  const setDay = day => {
    setState({
      ...state,
      day
    })
  };

  // Collects initial data from database when app is loaded
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ])
      .then(all => {
        setState(prevState => ({
          ...prevState,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })
      .catch(err => console.log(err.message));
  }, []);

  // Creates a new interview appointment, sends collected data to database
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState(prevState => ({
          ...prevState,
          appointments,
          days: getRemainingSpots(state.days, appointments)
          }))
      });

  }

  // Deletes an existing interview appointment, removes data from database
  const removeInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prevState => ({
          ...prevState,
          appointments,
          days: getRemainingSpots(state.days, appointments)
          }))
      });
 
  }

  // Calculates interview spots left, so the state is updated whenever an interview is booked or cancelled 
  const remainingSpots = (day, appointments) => {
    let spots = 0;
    const bookedSpots = day.appointments;
    bookedSpots.forEach(spot => {

      if (appointments[spot].interview === null) {
        spots++;
      }

    });

    return spots;

  };

  const getRemainingSpots = (days, appointments) => {
    const newRemainingSpots = days.map(day => ({
      ...day, spots: remainingSpots(day, appointments)
    }));

    return newRemainingSpots;
      
  }

  return {
    state,
    setDay,
    bookInterview,
    removeInterview
  };

}