export function getInterview(state, interview) {

  if (!interview) {

    return null;  

  } else {

    const interviewerID = interview.interviewer;
    const interviewerData = state.interviewers[interviewerID];
    return {...interview, interviewer: interviewerData};

  }
}

export function getAppointmentsForDay(state, day) {
  const result = [];
  const appointmentFilter = state.days.filter(d => d.name === day);

  if (!state.days.length || !appointmentFilter.length) {

    return result;

  } else {

    const appointments = appointmentFilter[0].appointments;
    appointments.forEach(a => result.push(state.appointments[a]));
    return result;

  }
}