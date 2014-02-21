=
Concepts in Browser Data and Searching
==
Introduction
-------

I have a large amount of personal content at home collected from various sources and there is a organize, quantify and sort my content.  Searching click by click on 20 TB of disk at home makes for tedious time and certainly result in content being "lost" but really not so. In the times of bill per bit and no unlimited downloading it is good to know you already have a 1 Gig movie already.
---------

===
The problem....

When you are a hordder of data, logs, code, content, music, video and anything else you manage over time to collect a lot of stuff. Some of it junk.  Though I am practical hordder in that I don't want repeats of say "star trek original Series 1 Episode 1".  

This means filling disk after disk, burning to CD's etc which after a while becomes not very practical.  When the urge arrives to watch Gun smoke, I want to click click and start watching a show I have not watched since I was a kid.

The Solution: NAS drives; yes, I could place them in some PC tower and use that as a media server (in some ways I do but using NFS).  The NAS drives are more practical when I want more drives I add them to the network and boom another 8 TB added on for less than 700 bucks.

Now to the real problem. As you add disk you end up with "Doctor Who" spread across many different drives and different NAS. 
___________________


==
Perl to the Rescue
...


==
The Data
	
	sample:

	  {
      "extension" : "mkv",
      "status" : "good",
      "espisode" : null,
      "size" : "3519541115",
      "series" : "1956",
      "datapoints" : [
         "videos",
         "movies",
         "Invasion.of.the.Body.Snatchers.1956.720p.BluRay.X264-AMIABLE [PublicHD]",
         "Invasion.of.the.Body.Snatchers.1956.720p.BluRay.X264-AMIABLE.mkv"
      ],
      "drive" : "/netdrives/drivecd/d/",
      "filename" : "invasion_of_the_body_snatchers_1956_720p_bluray_x264_amiable_mkv",
      "nasdrive" : "movie2 volume 2",
      "mediaType" : "movie",
      "id" : 54,
      "season" : "1956",
      "raw" : "/netdrives/drivecd/d/videos/movies/Invasion.of.the.Body.Snatchers.1956.720p.BluRay.X264-AMIABLE [PublicHD]/Invasion.of.the.Body.Snatchers.1956.720p.BluRay.X264-AMIABLE.mkv",
      "year" : "1956"
    },


