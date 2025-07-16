'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../lib/store/taskStore';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #333;
`;

const Title = styled.h1`
  color: #0070f3;
  margin-bottom: 20px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  background-color: #fff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: left;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 10px;
  }
`;

export default function HomePage() {
    const { tasks, fetchTasks } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <HomePageContainer>
            <Title>Welcome to My Task App!</Title>
            <h2>Tasks:</h2>
            {!tasks.length ? (
                <p>No tasks found.</p>
            ) : (
                <TaskList>
                    {tasks.map((task) => (
                        <TaskItem key={task.taskId}>
                            <span><strong>Task:</strong> {task.title}</span>
                            <span><strong>TaskId:</strong> {task.taskId}</span>
                            <span><strong>Status:</strong> {task.status}</span>
                        </TaskItem>
                    ))}
                </TaskList>
            )}
        </HomePageContainer>
    );
}