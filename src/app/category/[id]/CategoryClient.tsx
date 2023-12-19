"use client";
import { useParams } from "next/navigation";
import React from "react";
import styles from './CategoryClient.module.scss'
import Product from "@/components/product/Product";

const CategoryClient = () => {

  const { id } = useParams();

  return (
    <main className={styles.container}>
      {id}
      <Product />
    </main>
  );
};

export default CategoryClient;
