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
  // retrieve the day object for that day
  const dayFound = state.days.find(dayObj => dayObj.name === day)

  if (!dayFound) {
    return [];
  }

  // convert the appointments Ids from dayFound.appointments into the actual appointments objects
  const appointments = dayFound.appointments.map(appointId => state.appointments[appointId]);
  return appointments;

}

export function getInterviewersForDay(state, day) {
  
  const dayFound = state.days.find(dayObj => dayObj.name === day)

  if (!dayFound) {
    return [];
  }
  
  // convert the appointments Ids from dayFound.appointments into the actual appointments objects
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;

}