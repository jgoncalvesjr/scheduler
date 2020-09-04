import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    setState({
      ...state,
      day
    })
  };

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
  }, []);

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