import React, { useState } from 'react';
import '../styles/ControlPanel.css';

function ControlPanel({
  selectedGrouping,
  selectedSorting,
  onGroupingChange,
  onSortingChange,
  onDisplayClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="control-panel">
      <div className="navbar">
        <div>
          <button className="display-button" onClick={toggleDropdown}>
            Display
          </button>
        </div>
        <div>
          {isOpen && (<>
            <div className="control-group">
              <label htmlFor="groupingSelect">Group By:</label>
              <select
                id="groupingSelect"
                value={selectedGrouping}
                onChange={(e) => onGroupingChange(e.target.value)}
                onClick={onDisplayClick}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="control-group">
              <label htmlFor="sortingSelect">Sort By:</label>
              <select
                id="sortingSelect"
                value={selectedSorting}
                onChange={(e) => onSortingChange(e.target.value)}
                onClick={onDisplayClick}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
