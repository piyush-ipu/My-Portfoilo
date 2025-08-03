"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";

interface Props {
  thumbnail: string;
  video: string;
  title: string;
  link: {
    label: string;
    url: string;
  };
  description: string;
  languageIcons: string[];
}

export const Project = ({
  thumbnail,
  video,
  title,
  link,
  description,
  languageIcons,
}: Props) => {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const hasVideo = video && !videoError && !videoEnded;

  const handlePreviewClick = () => {
    if (!videoError && video) {
      setIsPlaying(true);
      setVideoEnded(false); // reset if previously ended
    } else {
      setIsPlaying(true); // Set to true even when video not available to show fallback message
    }
  };

  return (
    <CardContainer className="inter-var -mb-36">
      <CardBody className="group bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/20 rounded-2xl p-4 md:p-[15px] h-fit w-full max-w-[428px] shadow-md hover:shadow-xl transition-all duration-200">
        {/* Thumbnail + Video */}
        <CardItem className="w-full aspect-video relative rounded-xl overflow-hidden">
          {/* Base Thumbnail for all views */}
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-contain"
            priority
          />

          {/* Mobile: Show video or fallback only after clicking Preview */}
          <div className="absolute top-0 left-0 w-full h-full block md:hidden">
            {isPlaying ? (
              hasVideo ? (
                <video
                  className="w-full h-full object-fill"
                  autoPlay
                  muted
                  loop={false}
                  playsInline
                  onError={() => setVideoError(true)}
                  onEnded={() => setVideoEnded(true)}
                >
                  <source src={video} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/70 text-white text-xs font-semibold text-center px-2">
                  <span>
                    {videoEnded
                      ? "Preview ended. Please Visit Site"
                      : "Preview not available. Please Visit Site"}
                    <br />
                    <Link
                      href={link.url}
                      target="_blank"
                      className="hover:underline text-blue-300 mt-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </span>
                </div>
              )
            ) : null}
          </div>

          {/* Desktop Hover Effects */}
          <div className="absolute top-0 left-0 w-full h-full hidden md:block">
            {hasVideo ? (
              <video
                className="w-full h-full object-fill opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                autoPlay
                muted
                loop={false}
                playsInline
                onError={() => setVideoError(true)}
                onEnded={() => setVideoEnded(true)}
              >
                <source src={video} type="video/mp4" />
              </video>
            ) : (
              <div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                w-full h-full flex items-center justify-center 
                bg-black bg-opacity-50 text-white text-sm font-semibold text-center px-2"
              >
                {videoEnded ? (
                  <span>
                    Preview ended. Please Visit Site
                    <br />
                    <Link
                      href={link.url}
                      target="_blank"
                      className="hover:underline text-blue-300 mt-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </span>
                ) : (
                  <span>
                    Preview not available. Please Visit Site
                    <br />
                    <Link
                      href={link.url}
                      target="_blank"
                      className=" hover:underline text-blue-300 mt-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </span>
                )}
              </div>
            )}
          </div>
        </CardItem>

        {/* Title + Link */}
        <div className="flex justify-between items-center mt-4 gap-2">
          <CardItem className="text-xl font-semibold text-neutral-800 dark:text-white">
            {title}
          </CardItem>
          <CardItem
            as={Link}
            href={link.url}
            target="_blank"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {link.label}
          </CardItem>
        </div>

        {/* Preview Button for Mobile */}
        <Button
          onClick={handlePreviewClick}
          className="h-6 px-1.5 rounded-sm my-1 flex sm:hidden"
        >
          Preview
        </Button>

        {/* Description */}
        <CardItem
          as="p"
          className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300 mt-2"
        >
          {description}
        </CardItem>

        {/* Language Icons */}
        <CardItem className="flex items-center gap-3 mt-4">
          {languageIcons.map((icon, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-lg p-1 shadow-sm"
            >
              <Image
                src={icon}
                alt="Language Icon"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
          ))}
        </CardItem>
      </CardBody>
      <>
              <Image
                src="/svg/projects_highlight.svg"
                alt="Background project"
                width={558}
                height={558}
                className="absolute -z-10 hidden md:block left-1/2 -translate-x-1/2 translate-y-1/2"
              />
              <Image
                src="/svg/projects_highlight_mobile.svg"
                alt="Mobile Background project"
                width={558}
                height={558}
                className="absolute -z-10 md:hidden left-1/2 -translate-x-1/2 translate-y-1/2"
              />
            </>
    </CardContainer>
  );
};
