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

export function getInterviewersForDay(state, day) {
  const result = [];
  const interviewerFilter = state.days.filter(d => d.name === day);

  if (!state.days.length || !interviewerFilter.length) {

    return result;

  } else {

    const interviewers = interviewerFilter[0].interviewers;
    interviewers.forEach(i => result.push(state.interviewers[i]));
    return result;

  }
}