import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CRMEvent from './interfaces/CRMEvent';
import ExistingEvent from './components/ExistingEvent';
declare global {
    interface Window { 
      showEventForm(object): void,
      showNewEventForm(start: string,end: string): void,
      CRM: {
        refreshAllFullCalendarSources(): void 
      } 
    }
}

window.showEventForm = function(event) {
    const unmount = function() {
        ReactDOM.unmountComponentAtNode( document.getElementById('calendar-event-react-app'));
        window.CRM.refreshAllFullCalendarSources()
    }
    unmount();
    ReactDOM.render(<EventEditor unmountCall={unmount} eventId={event.id}/>, document.getElementById('calendar-event-react-app'));
}

window.showNewEventForm = function(start,end) {
  const unmount = function() {
    ReactDOM.unmountComponentAtNode( document.getElementById('calendar-event-react-app'));
    window.CRM.refreshAllFullCalendarSources()
  }
  unmount();
  //ReactDOM.render(<NewEvent unmountCall={unmount} />, document.getElementById('calendar-event-react-app'));
}

class EventEditor extends React.Component<{unmountCall:Function, eventId: number}> {

    render() {
      return (
        <div >
          <ExistingEvent onClose={this.props.unmountCall} eventId={this.props.eventId} />
        </div>
      );
    }
  };