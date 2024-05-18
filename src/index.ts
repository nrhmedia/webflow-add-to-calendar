const startTimeElement = document.getElementById('start-time');
const endTimeElement = document.getElementById('end-time');
const startDateElement = document.getElementById('start-date');
const endDateElement = document.getElementById('end-date');
const locationElement = document.getElementById('add-to-calendar-date');

function isValidDate(dateStr) {
  return !isNaN(new Date(dateStr).getDate());
}

function isValidTime(timeElement) {
  return timeElement && timeElement.textContent.trim().includes(':');
}

if (
  isValidTime(startTimeElement) &&
  isValidTime(endTimeElement) &&
  isValidDate(startDateElement.textContent.trim()) &&
  isValidDate(endDateElement.textContent.trim())
) {
  const timeElements = [
    { id: 'end-time', formattedTime: '' },
    { id: 'start-time', formattedTime: '' },
  ];

  timeElements.forEach((timeElement) => {
    const element = document.getElementById(timeElement.id);
    const [hour, minute] = element.textContent.trim().split(':');
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    timeElement.formattedTime = `${formattedHour}:${formattedMinute}`;
  });

  const eventStartDate = startDateElement.textContent.trim();
  const eventStartTime = timeElements.find((t) => t.id === 'start-time').formattedTime;
  const eventEndDate = endDateElement.textContent.trim();
  const eventEndTime = timeElements.find((t) => t.id === 'end-time').formattedTime;
  const eventLocation = locationElement ? locationElement.textContent.trim() : ''; // New line to get the location text

  const configdate = {
    name: '{{wf {&quot;path&quot;:&quot;post-title&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}',
    description:
      '{{wf {&quot;path&quot;:&quot;meta-description&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}',
    startDate: eventStartDate,
    startTime: eventStartTime,
    endDate: eventEndDate,
    endTime: eventEndTime,
    timeZone:
      '{{wf {&quot;path&quot;:&quot;time-zone&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}',
    location: eventLocation,
    options: ['Google', 'iCal', 'Apple', 'Outlook.com', 'Yahoo'],
  };

  const buttondate = document.getElementById('add-calendar-button');
  if (buttondate) {
    buttondate.addEventListener('click', () => atcb_action(configdate, buttondate));
  }
}
