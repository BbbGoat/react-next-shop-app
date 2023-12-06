"use client";
import { useParams } from "next/navigation";
import React from "react";
import styles from './CategoryClient.module.scss'

const CategoryClient = () => {

  const { id } = useParams();

  return (
    <main className={styles.container}>
      <div>
        <div>전체</div>
        {id}
      </div>
    </main>
  );
};

export default CategoryClient;
