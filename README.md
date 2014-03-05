jQuery Media Data and Searching
=


Introduction
==


I have a large amount of personal content at home collected from various sources and there is a organize, quantify and sort my content.  Searching click by click on 20 TB of disk at home makes for tedious time and certainly result in content being "lost" but really not so. In the times of bill per bit and no unlimited downloading it is good to know you already have a 1 Gig movie already.

![nas drives](/images/nas.jpg)

![Browser](/images/bee.jpg)
![Bee](/images/beer.jpg)
![Browser](/images/beers.jpg)




The problem....
==


When you are a horder of data, logs, code, content, music, video and anything else you manage over time to collect a lot of stuff. Some of it junk.  Though I am practical horder in that I don't want repeats of say "star trek original Series 1 Episode 1".  

This means filling disk after disk, burning to CD's etc which after a while becomes not very practical.  When the urge arrives to watch Gun smoke, I want to click click and start watching a show I have not watched since I was a kid.

The Solution: NAS drives; yes, I could place them in some PC tower and use that as a media server (in some ways I do but using NFS).  The NAS drives are more practical when I want more drives I add them to the network and boom another 8 TB added on for less than 700 bucks.

Now to the real problem. As you add disk you end up with "Doctor Who" spread across many different drives and different NAS. 

Perl to the Rescue...
===

How to build the data? What format, what database, why a tradition database? How do I get the data across for so many drives? So many questions and these were not the only questions I had to ask myself.  I needed a quick and effect means to collect large amount of data and write some base reporting data.

In the perl directory you will find [diskmap.pl](https://github.com/alexmac131/mediaData/blob/master/perl/diskmap.pl) which quickly scans across multipul NFS mounted drivdes, collects the data and then posts various raw map data to files, directories, zero files and rejected files that don't meet a specific format.

The next aspect is to take the file data and parse it into something useful where all have is a downloaded file formated by nothing more than a social convention.  Extracting data such as the year it was publish, the series  information etcand in additon filter out all the "graffti" tags uploaders add.


The Data
===
	
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


