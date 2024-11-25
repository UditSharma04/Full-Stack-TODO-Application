import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

const getCurrentDateTime = () => {
    const now = new Date();
    // Format: YYYY-MM-DDThh:mm
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
};

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const slideIn = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
};

const popUpVariants = {
    hidden: { 
        opacity: 0,
        scale: 0.95,
        y: 20
    },
    visible: { 
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.5
        }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const TaskStats = ({ todos, darkMode }) => {
    const totalTasks = todos?.length || 0;
    const completedTasks = todos?.filter(t => t.status === 'completed').length || 0;
    const activeTasks = todos?.filter(t => t.status === 'active').length || 0;
    
    return (
        <motion.div 
            className={`flex flex-col gap-4 card fixed right-8 top-24 w-64 p-6`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <h3 className={`text-xl font-bold ${
                darkMode ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'
            } text-center border-b pb-2`}>Stats</h3>
            <div className={`text-center py-3 ${
                darkMode ? 'bg-[#252538]' : 'bg-white'
            } rounded-lg shadow-sm hover:shadow transition-all`}>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {totalTasks}
                </p>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Tasks
                </p>
            </div>
            <div className={`text-center py-3 ${
                darkMode ? 'bg-[#252538]' : 'bg-white'
            } rounded-lg shadow-sm hover:shadow transition-all`}>
                <p className="text-3xl font-bold text-green-500">{activeTasks}</p>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Active
                </p>
            </div>
            <div className={`text-center py-3 ${
                darkMode ? 'bg-[#252538]' : 'bg-white'
            } rounded-lg shadow-sm hover:shadow transition-all`}>
                <p className="text-3xl font-bold text-blue-500">{completedTasks}</p>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Completed
                </p>
            </div>
        </motion.div>
    );
};

const PriorityBadge = ({ priority }) => {
    const colors = {
        high: 'bg-red-100 text-red-800',
        medium: 'bg-yellow-100 text-yellow-800',
        low: 'bg-green-100 text-green-800'
    }
    
    return (
        <span className={`${colors[priority]} text-xs px-2 py-1 rounded-full`}>
            {priority}
        </span>
    )
}

const CategoryBadge = ({ category }) => {
    const colors = {
        Work: 'bg-blue-100 text-blue-800',
        Personal: 'bg-purple-100 text-purple-800',
        Shopping: 'bg-pink-100 text-pink-800',
        Health: 'bg-green-100 text-green-800',
        Study: 'bg-yellow-100 text-yellow-800',
        General: 'bg-gray-100 text-gray-800'
    }
    
    return (
        <span className={`${colors[category] || colors.General} text-xs px-2 py-1 rounded-full`}>
            {category}
        </span>
    )
}

const getSelectedTasksStatus = (selectedTasks, todos) => {
    const selectedTasksData = todos?.filter(todo => selectedTasks.includes(todo.id)) || [];
    const hasActiveTasks = selectedTasksData.some(task => task.status === 'active');
    const hasCompletedTasks = selectedTasksData.some(task => task.status === 'completed');
    return { hasActiveTasks, hasCompletedTasks };
};

const Home = () => {
    const [tab, setTab] = useState(1)
    const [task, setTask] = useState('')
    const [todos, setTodos] = useState(null)
    const [isEdit, setIsEdit] = useState(false);

    const [activeTodos, setActiveTodos] = useState(null)
    const [completedTodos, setCompletedTodos] = useState(null)

    const [darkMode, setDarkMode] = useState(false);

    const [priority, setPriority] = useState('medium')
    const [dueDate, setDueDate] = useState(getCurrentDateTime())

    const [searchTerm, setSearchTerm] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const [category, setCategory] = useState('General')

    const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Study']

    const [selectedTasks, setSelectedTasks] = useState([])

    const [notes, setNotes] = useState('')

    const handleTabs = (tab) => {
        setTab(tab)
        
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!task.trim()) {
            toast.error('Task cannot be empty!');
            return;
        }
        
        axios.post('http://localhost:5000/new-task', {
            task,
            priority,
            dueDate,
            category,
            notes
        })
        .then(res => {
            setTodos(res.data)
            setTask('')
            setPriority('medium')
            setDueDate(getCurrentDateTime())
            setCategory('General')
            setNotes('')
            toast.success('Task added successfully!', {
                duration: 2000,
                position: 'top-right',
            })
        })
        .catch(() => {
            toast.error('Failed to add task')
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/read-tasks')
        .then(res => {
            setTodos(res.data)
            
        })
    }, [])

    

    const [updateId, setUpdateId] = useState(null)
    const [updatedTask, setUpdatedTask] = useState('')
    const handleEdit = (id, task, notes) => {
        setIsEdit(true)
        setTask(task)
        setNotes(notes || '')
        setUpdateId(id)
    }

    const updateTask = () => {
        if (!task.trim()) {
            toast.error('Task cannot be empty!');
            return;
        }

        axios.post('http://localhost:5000/update-task', {
            updateId,
            task,
            priority,
            dueDate,
            category,
            notes
        })
        .then(res => {
            setTodos(res.data)
            setTask('')
            setPriority('medium')
            setDueDate(getCurrentDateTime())
            setCategory('General')
            setNotes('')
            setIsEdit(false)
            toast.success('Task updated successfully!', {
                duration: 2000,
                position: 'top-right',
            })
        })
        .catch(() => {
            toast.error('Failed to update task')
        })
    }

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span>Are you sure you want to delete this task?</span>
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => {
                            axios.post('http://localhost:5000/delete-task', {id})
                            .then(res => {
                                setTodos(res.data)
                                toast.success('Task deleted successfully!')
                            })
                            .catch(() => {
                                toast.error('Failed to delete task')
                            })
                            toast.dismiss(t.id)
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="px-2 py-1 bg-gray-500 text-white rounded"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'top-center',
        })
    }

    const handleComplete = (id) => {
        axios.post('http://localhost:5000/complete-task', {id})
        .then(res => {
            setTodos(res.data)
            toast.success('Great job completing the task!', {
                icon: '🎉',
                duration: 2000,
                position: 'top-right',
            })
        })
        .catch(() => {
            toast.error('Failed to complete task')
        })
    }

    const handleRevert = (id) => {
        axios.post('http://localhost:5000/revert-task', {id})
        .then(res => {
            setTodos(res.data)
            toast.success('Task reverted to active status', {
                duration: 2000,
                position: 'top-right',
            })
        })
        .catch(() => {
            toast.error('Failed to revert task')
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (isEdit) {
                updateTask();
            } else {
                handleAddTask(e);
            }
        }
    }

    const getFilteredTodos = (todos) => {
        if (!todos) return [];
        
        return todos.filter(todo => {
            const matchesSearch = todo.task.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
            const matchesCategory = categoryFilter === 'all' || todo.category === categoryFilter;
            
            if (tab === 1) return matchesSearch && matchesPriority && matchesCategory;
            if (tab === 2) return matchesSearch && matchesPriority && matchesCategory && todo.status === 'active';
            if (tab === 3) return matchesSearch && matchesPriority && matchesCategory && todo.status === 'completed';
            
            return false;
        });
    };

    const handleBulkAction = (action) => {
        switch(action) {
            case 'delete':
                toast((t) => (
                    <div className="flex flex-col gap-2">
                        <span>Delete {selectedTasks.length} selected tasks?</span>
                        <div className="flex gap-2">
                            <button
                                className="px-2 py-1 bg-red-500 text-white rounded"
                                onClick={() => {
                                    Promise.all(selectedTasks.map(id => 
                                        axios.post('http://localhost:5000/delete-task', {id})
                                    ))
                                    .then(() => {
                                        axios.get('http://localhost:5000/read-tasks')
                                        .then(res => setTodos(res.data))
                                        setSelectedTasks([])
                                        toast.success('Tasks deleted successfully!')
                                    })
                                    toast.dismiss(t.id)
                                }}
                            >
                                Delete All
                            </button>
                            <button
                                className="px-2 py-1 bg-gray-500 text-white rounded"
                                onClick={() => toast.dismiss(t.id)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ), {
                    duration: 5000,
                    position: 'top-center',
                });
                break;
            
            case 'complete':
                Promise.all(selectedTasks.map(id => 
                    axios.post('http://localhost:5000/complete-task', {id})
                ))
                .then(() => {
                    axios.get('http://localhost:5000/read-tasks')
                    .then(res => setTodos(res.data))
                    setSelectedTasks([])
                    toast.success('Tasks marked as completed! 🎉')
                });
                break;
                
            case 'revert':
                Promise.all(selectedTasks.map(id => 
                    axios.post('http://localhost:5000/revert-task', {id})
                ))
                .then(() => {
                    axios.get('http://localhost:5000/read-tasks')
                    .then(res => setTodos(res.data))
                    setSelectedTasks([])
                    toast.success('Tasks reverted to active!')
                });
                break;
        }
    };

  return (
    <div className="page-bg min-h-screen">
        <Toaster />
        
        {/* Header Section */}
        <div className="header-section">
            <div className="container-layout">
                <motion.h2 
                    className="font-bold text-3xl text-[#1E293B] text-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Task Manager
                </motion.h2>
                <motion.p 
                    className="mt-2 text-center text-[#64748B]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    Create and manage your daily tasks
                </motion.p>
            </div>
        </div>

        <div className="container-layout">
            {/* Stats Section */}
            <motion.div 
                className="stats-grid-mobile"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="card p-4 flex flex-col items-center"
                    variants={popUpVariants}
                >
                    <span className="text-2xl font-semibold text-[#1E293B] mb-1">
                        {todos?.length || 0}
                    </span>
                    <span className="text-sm text-[#64748B]">Total Tasks</span>
                </motion.div>
                
                <motion.div 
                    className="card p-4 flex flex-col items-center"
                    variants={popUpVariants}
                >
                    <span className="text-2xl font-semibold text-[#2563EB] mb-1">
                        {todos?.filter(t => t.status === 'active').length || 0}
                    </span>
                    <span className="text-sm text-[#64748B]">Active Tasks</span>
                </motion.div>
                
                <motion.div 
                    className="card p-4 flex flex-col items-center"
                    variants={popUpVariants}
                >
                    <span className="text-2xl font-semibold text-[#22C55E] mb-1">
                        {todos?.filter(t => t.status === 'completed').length || 0}
                    </span>
                    <span className="text-sm text-[#64748B]">Completed</span>
                </motion.div>
                
                <motion.div 
                    className="card p-4 flex flex-col items-center"
                    variants={popUpVariants}
                >
                    <span className="text-2xl font-semibold text-[#F59E0B] mb-1">
                        {todos?.filter(t => new Date(t.dueDate) < new Date()).length || 0}
                    </span>
                    <span className="text-sm text-[#64748B]">Overdue</span>
                </motion.div>
            </motion.div>

            {/* Create Task Section */}
            <motion.div 
                className="card mb-8"
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
            >
                <h3 className="text-lg font-semibold text-[#1E293B] mb-6">Create New Task</h3>
                <div className="space-y-5">
                    <input 
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        onKeyPress={handleKeyPress}
                        type="text"
                        placeholder="Task title"
                        className="input-primary"
                    />
                    
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Add description"
                        className="textarea-primary"
                        rows="3"
                    />
                    
                    <div className="input-group-mobile">
                        <select 
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="select-primary"
                        >
                            <option value="" disabled>Select Priority</option>
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>

                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select-primary"
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <input 
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="select-primary"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={isEdit ? updateTask : handleAddTask}
                            className="btn-primary"
                        >
                            {isEdit ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Filters Section */}
            <motion.div 
                className="filter-group-mobile"
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
            >
                <input 
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-primary"
                />
                <div className="flex gap-3">
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="select-primary flex-1"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="select-primary flex-1"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </motion.div>

            {/* Tabs */}
            <motion.div 
                className="mb-6"
                variants={popUpVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="tab-container">
                    {['All', 'Active', 'Completed'].map((tabName, index) => (
                        <button
                            key={tabName}
                            onClick={() => handleTabs(index + 1)}
                            className={`tab-button ${
                                tab === index + 1 ? 'tab-active' : 'tab-inactive'
                            }`}
                        >
                            {tabName}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Tasks List */}
            <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {getFilteredTodos(todos)?.map(todo => (
                    <motion.div 
                        key={todo.id}
                        variants={popUpVariants}
                        className="task-card"
                        whileHover={{ y: -2 }}
                    >
                        <div className="task-card-mobile">
                            <div className="flex items-start gap-3">
                                <input 
                                    type="checkbox"
                                    checked={selectedTasks.includes(todo.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedTasks([...selectedTasks, todo.id]);
                                        } else {
                                            setSelectedTasks(selectedTasks.filter(id => id !== todo.id));
                                        }
                                    }}
                                    className="mt-1 h-4 w-4 rounded-md border-[#E2E8F0] 
                                    text-[#2563EB] focus:ring-[#2563EB]/20"
                                />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                        <h3 className="text-[#1E293B] font-medium flex-1">
                                            {todo?.task}
                                        </h3>
                                        <div className="flex flex-wrap gap-1">
                                            <PriorityBadge priority={todo.priority} />
                                            <CategoryBadge category={todo.category} />
                                        </div>
                                    </div>
                                    {todo.notes && (
                                        <p className="text-sm text-[#64748B] mb-2">
                                            {todo.notes}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs text-[#64748B]">
                                            Created: {new Date(todo.createdAt).toLocaleDateString()}
                                        </span>
                                        {todo.dueDate && (
                                            <span className="text-xs text-[#64748B]">
                                                Due: {new Date(todo.dueDate).toLocaleString()}
                                            </span>
                                        )}
                                        <span className={todo.status === 'completed' ? 'status-completed' : 'status-active'}>
                                            {todo.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons-mobile">
                                {todo.status === 'completed' ? (
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => handleRevert(todo.id)}
                                            className="btn-secondary flex-1 sm:flex-none"
                                        >
                                            Revert
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(todo.id)}
                                            className="btn-danger flex-1 sm:flex-none"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => handleEdit(todo.id, todo.task)}
                                            className="btn-secondary flex-1 sm:flex-none"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleComplete(todo.id)}
                                            className="btn-success flex-1 sm:flex-none"
                                        >
                                            Complete
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(todo.id)}
                                            className="btn-danger flex-1 sm:flex-none"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Empty State */}
                {getFilteredTodos(todos)?.length === 0 && (
                    <motion.div 
                        variants={fadeIn}
                        className="card text-center py-12"
                    >
                        {searchTerm ? (
                            <>
                                <p className="text-lg text-[#1E293B] mb-1">No matching tasks found</p>
                                <p className="text-sm text-[#64748B]">Try adjusting your search or filters</p>
                            </>
                        ) : (
                            <>
                                <p className="text-lg text-[#1E293B] mb-1">No tasks to display</p>
                                <p className="text-sm text-[#64748B]">Add your first task to get started</p>
                            </>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </div>

        {/* Bulk Actions */}
        {selectedTasks.length > 0 && (
            <motion.div 
                className="bulk-actions-mobile"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.3 }}
            >
                <div className="flex flex-col sm:flex-row items-center gap-3 relative">
                    <button
                        onClick={() => setSelectedTasks([])}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-100 
                        hover:bg-gray-200 flex items-center justify-center text-gray-500 
                        hover:text-gray-700 transition-all duration-200"
                        aria-label="Close bulk actions"
                    >
                        ×
                    </button>
                    
                    <span className="font-medium text-[#1E293B]">
                        {selectedTasks.length} tasks selected
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => handleBulkAction('delete')}
                            className="btn-danger flex-1 sm:flex-none"
                        >
                            Delete All
                        </button>

                        {getSelectedTasksStatus(selectedTasks, todos).hasActiveTasks && 
                        !getSelectedTasksStatus(selectedTasks, todos).hasCompletedTasks && (
                            <button
                                onClick={() => handleBulkAction('complete')}
                                className="btn-success flex-1 sm:flex-none"
                            >
                                Complete All
                            </button>
                        )}

                        {getSelectedTasksStatus(selectedTasks, todos).hasCompletedTasks && 
                        !getSelectedTasksStatus(selectedTasks, todos).hasActiveTasks && (
                            <button
                                onClick={() => handleBulkAction('revert')}
                                className="btn-primary flex-1 sm:flex-none"
                            >
                                Revert All
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        )}
    </div>
  )
}

export default Home
