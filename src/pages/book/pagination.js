/*
Name: Anant Batgali
Date: 6/16/22
File: pagination.js
Description: 
*/

import {settings} from "../../config/config";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import React from 'react';

const Pagination = ({books, setUrl}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState("book_id:asc");
    const [pages, setPages] = useState({});  //first, last, previous, and next pages

    useEffect(() => {
        if(books) {
            let pages = {};
            setLimit(books.limit);
            setOffset(books.offset);
            setTotalPages(Math.ceil(books.totalCount/limit));
            setCurrentPage(books.offset/books.limit + 1);

            //Extract offset from each link and store it in pages
            books.links.map((link) => {
                pages[link.rel] = link.href;
            });

            if(!pages.hasOwnProperty('prev')) {
                pages.prev = pages.self;
            }

            if(!pages.hasOwnProperty('next')) {
                pages.next = pages.self;
            }
            setPages(pages);
        }
    },[books]);

    const handlePageClick = (e) => {
        setUrl(e.target.id + "&sort=" + sort);
    }

    const setItemsPerPage = (e) => {
        setLimit(e.target.value);
        setOffset(0);
        setUrl(`${settings.baseApiUrl}/books?limit=${e.target.value}&offset=0&sort=${sort}`);
    }

    const sortCourses = (e) => {
        setSort(e.target.value);
        setUrl(`${settings.baseApiUrl}/books?limit=${limit}&offset=${offset}&sort=${e.target.value}`);
    }


    return (
        <>
            {books && <div className="course-pagination-container">
                <div className="course-pagination">
                    Showing page {currentPage} of {totalPages}&nbsp;&nbsp;&nbsp;
                    <Link to="#" title="First page" id={pages.first} onClick={handlePageClick}> &lt;&lt; </Link>
                    <Link to="#" title="Previous page" id={pages.prev} onClick={handlePageClick}> &lt; </Link>
                    <Link to="#" title="Next page" id={pages.next} onClick={handlePageClick}> &gt; </Link>
                    <Link to="#" title="Last page" id={pages.last} onClick={handlePageClick}> &gt;&gt; </Link>
                    <br/> Items per page &nbsp;
                    <select onChange={setItemsPerPage} defaultValue="5">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="course-sorting"> Sort by:&nbsp;
                    <select onChange={sortCourses}>
                        <option value="title:asc">Title A-Z</option>
                        <option value="title:desc">Title Z-A</option>
                        <option value="price:asc">Price low to high</option>
                        <option value="price:desc">Price high to low</option>
                        <option value="book_id:asc">Number A-Z</option>
                        <option value="book_id:desc">Number Z-A</option>
                    </select>
                </div>
            </div>}
        </>
    );
};

export default Pagination;