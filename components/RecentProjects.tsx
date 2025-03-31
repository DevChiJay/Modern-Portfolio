"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const RecentProjects = () => {
  // Initialize with empty strings/arrays to avoid null values during server rendering
  const [humorQuote, setHumorQuote] = useState("");
  const [allQuotes, setAllQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create a stable function to display random quotes
  const displayRandomQuote = useCallback(() => {
    if (allQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allQuotes.length);
      setHumorQuote(allQuotes[randomIndex].title);
    }
  }, [allQuotes]);

  // Move data fetching to the client side only
  useEffect(() => {
    const fetchAllHumorQuotes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.devchihub.com/humor/all"
        );
        const quotes = response.data.humors;
        const quoteArray = Array.isArray(quotes) ? quotes : [quotes];
        setAllQuotes(quoteArray);

        // Display first random quote
        if (quoteArray.length > 0) {
          const randomIndex = Math.floor(Math.random() * quoteArray.length);
          setHumorQuote(quoteArray[randomIndex].title);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching humor quotes:", error);
        setHumorQuote("Could not fetch humor quotes at this time.");
        setIsLoading(false);
      }
    };

    fetchAllHumorQuotes(); // Initial fetch of all quotes
  }, []);

  // Set up interval in a separate effect
  useEffect(() => {
    // Only set up the interval once we have quotes
    if (allQuotes.length > 0) {
      const intervalId = setInterval(() => {
        displayRandomQuote();
      }, 10000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [allQuotes, displayRandomQuote]);

  // Fix potentially randomized rendering with this approach
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render client-specific content after component mounts on client
  if (!isMounted) {
    return (
      <div className="py-20" id="projects">
        <h1 className="heading">
          A small selection of{" "}
          <span className="text-purple">recent projects</span>
        </h1>
        {/* Loading state for the entire component */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-white/10 shadow-xl">
            <h3 className="text-center text-xl font-medium mb-4 text-purple">
              Random Humor API
            </h3>
            <div className="min-h-[60px] flex items-center justify-center">
              <div className="animate-pulse w-full h-4 bg-white/20 rounded"></div>
            </div>
            {/* Rest of loading state UI */}
            <div className="flex justify-center mt-6">
              <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
            </div>
            <p className="flex items-end text-xs text-white/50 ml-auto">
              Refreshes every 10 seconds
            </p>
          </div>
        </div>
        {/* Simple loading state for projects */}
        <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
          {[1, 2, 3].map((placeholder) => (
            <div
              key={placeholder}
              className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] bg-gradient-to-br from-purple-900/10 to-indigo-900/10 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      {/* Humor Quote Card */}
      <div className="mt-16 flex justify-center">
        <div className="w-full max-w-3xl p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-white/10 shadow-xl">
          <h3 className="text-center text-xl font-medium mb-4 text-purple">
            Random Humor API
          </h3>
          <div className="min-h-[60px] flex items-center justify-center">
            {isLoading ? (
              <div className="animate-pulse w-full h-4 bg-white/20 rounded"></div>
            ) : (
              <p className="text-center text-lg italic">{humorQuote}</p>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <a
              href="https://github.com/DevChiJay/APIs-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-purple transition-colors text-sm"
            >
              <Image
                src="/git.svg"
                alt="GitHub"
                width={16}
                height={16}
                className="mb-0.5"
                unoptimized
              />
              View source code
            </a>
          </div>
          {/* Stack icons */}
          <p className="flex items-end text-xs text-white/50 ml-auto">
            Refreshes every 10 seconds
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
          >
            <div className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]">
              <PinContainer title={item.link} href={item.link}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img
                      src="/bg.png"
                      alt="bgimg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <img
                    src={item.img}
                    alt={`${item.title} cover`}
                    className="z-10 absolute bottom-0 object-contain max-w-full max-h-[90%]"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={icon}
                          alt={`Technology icon ${index + 1}`}
                          className="p-2"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
