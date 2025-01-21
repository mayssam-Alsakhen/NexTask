"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from "@/Components/card/Card";

const ProjectTasks = ({ params }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: projectId } = params; // Extract `projectId` from route params

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost/nextask/get_tasks_by_project_id.php?project_id=${projectId}`
        );
        if (response.data && response.data.tasks) {
          setTasks(response.data.tasks);
        } else {
          setError("No tasks found for this project");
        }
      } catch (err) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full bg-secondDark p-10 border-2 border-designing rounded-lg">
        <Card cards={tasks}/>
    </div>
  );
};

export default ProjectTasks;
