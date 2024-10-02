import React, { useEffect, useState } from 'react';
import '../styles/Board.css';
import Card from './Card';
import ControlPanel from './ControlPanel';
import { fetchKanbanData } from '../services/api';

function Board() {
  const [tasks, setTasks] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState('status'); 
  const [selectedSorting, setSelectedSorting] = useState('priority'); 
  const [groupedTasks, setGroupedTasks] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchKanbanData()
      .then((data) => {
        if (data && data.tickets) {
          setTasks(data.tickets);
          setLoading(false); 
        }
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      });
  }, []);

  const onGroupingChange = (grouping) => setSelectedGrouping(grouping);
  const onSortingChange = (sorting) => setSelectedSorting(sorting);
  const onDisplayClick = () => displayTasks(selectedGrouping, selectedSorting);

  function displayTasks(grouping, sorting) {
    let displayedTasks = {};

    if (grouping === 'status') {
      displayedTasks = groupByStatus(tasks);
    } else if (grouping === 'user') {
      displayedTasks = groupByUser(tasks);
    } else if (grouping === 'priority') {
      displayedTasks = groupByPriority(tasks);
    }

    if (sorting === 'priority') {
      displayedTasks = sortTasksByPriority(displayedTasks);
    } else if (sorting === 'title') {
      displayedTasks = sortTasksByTitle(displayedTasks);
    }

    setGroupedTasks(displayedTasks);
  }

  function groupByStatus(tasks) {
    const groupedTasks = {};

    tasks.forEach((task) => {
      if (!groupedTasks[task.status]) {
        groupedTasks[task.status] = [];
      }
      groupedTasks[task.status].push(task);
    });

    return groupedTasks;
  }

  function groupByUser(tasks) {
    const groupedTasks = {};

    tasks.forEach((task) => {
      if (!groupedTasks[task.userId]) {
        groupedTasks[task.userId] = [];
      }
      groupedTasks[task.userId].push(task);
    });

    return groupedTasks;
  }

  function groupByPriority(tasks) {
    const groupedTasks = {};

    tasks.forEach((task) => {
      if (!groupedTasks[task.priority]) {
        groupedTasks[task.priority] = [];
      }
      groupedTasks[task.priority].push(task);
    });

    return groupedTasks;
  }

  function sortTasksByPriority(groupedTasks) {
    const sortedTasks = {};
    Object.keys(groupedTasks).forEach((priority) => {
      sortedTasks[priority] = groupedTasks[priority].sort((a, b) => b.priority - a.priority);
    });

    return sortedTasks;
  }

  function sortTasksByTitle(groupedTasks) {
    const sortedTasks = {};
    Object.keys(groupedTasks).forEach((key) => {
      sortedTasks[key] = groupedTasks[key].sort((a, b) => a.title.localeCompare(b.title));
    });

    return sortedTasks;
  }

  return (
    <div className="board">
      <nav className="navbar">
        <ControlPanel
          selectedGrouping={selectedGrouping}
          selectedSorting={selectedSorting}
          onGroupingChange={onGroupingChange}
          onSortingChange={onSortingChange}
          onDisplayClick={onDisplayClick}
        />
      </nav>
      {loading && <p>Loading tasks...</p>}
      {!loading && Object.keys(groupedTasks).length > 0 && (
        <>
          {Object.keys(groupedTasks).map((columnTitle) => (
            <div className="column" key={columnTitle}>
              <div className="column-title">{columnTitle}</div>
              {groupedTasks[columnTitle].map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Board;
