"use client";
import { useParams } from "next/navigation";
import React from "react";
import styles from './CategoryClient.module.scss'
import Product from "@/components/product/Product";

const CategoryClient = () => {

  const { id } = useParams() as { id: string };

  return (
    <main className={styles.container}>
      <Product id={id} />
    </main>
  );
};

export default CategoryClient;
