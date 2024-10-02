import React from 'react';
import '../styles/Card.css';

function Card({ task }) {
    const statusCircleStyle = {
        backgroundColor: getStatusColor(task.status),
      };
  return (
    <div className={`card`} data-status={task.status}>
      <div className="status-circle" style={statusCircleStyle}></div>
      <div className="card-id">{task.id}</div>
      <div className="card-title">{task.title}</div>
      <div className="card-tag">
        <span className="tag-text">{task.tag}</span>
      </div>
      <div className="card-userId">{task.userId}</div>
      <div className="card-priority">{getPriorityLabel(task.priority)}</div>
    </div>
  );
}

function getStatusColor(status) {
    switch (status) {
      case 'Backlog':
        return '#FF5733';
      case 'Todo':
        return '#F39C12';
      case 'In progress':
        return '#EBCB62 ';
      case 'Done':
        return '#A9DFBF';
      case 'Cancelled':
        return '#9B59B6';
      default:
        return '';
    }
  }

function getPriorityLabel(priority) {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
      return 'No priority';
    default:
      return '';
  }
}

export default Card;
