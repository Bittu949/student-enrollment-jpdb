# 🎓 Student Enrollment Form using JsonPowerDB

A lightweight web application built with **HTML, Bootstrap, jQuery**, and **JsonPowerDB (JPDB)** to manage student enrollment records.  
The application supports **Save**, **Update**, and **Reset** operations with intelligent UI behavior based on whether a student record already exists.

---

## ✨ Features

- 🔍 **Auto-fetch student details** using Roll No (primary key)
- 🧠 Smart form behavior:
  - Enables **Save** for new records
  - Enables **Update** for existing records
- 🚫 Prevents empty submissions with validation
- 🔄 Reset functionality restores the default state
- ⚡ Uses JPDB’s `GET_BY_KEY`, `PUT`, and `UPDATE` APIs

---

## 🛠 Tech Stack

| Technology | Usage |
|----------|------|
| HTML5 | Structure |
| Bootstrap 3 | UI Styling |
| jQuery | DOM & AJAX |
| JsonPowerDB | Backend Database |

---

## 📁 Project Structure

```text
public_html/
├── index.html
└── js/
    └── index.js
