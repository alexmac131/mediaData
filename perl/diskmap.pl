#!/usr/bin/perl

use File::Find;
use Getopt::Long;
use Data::Dumper;
#use Log::Log4perl;
use strict;

# directory configuration file

my $configDirectory  = "/root/config";
my @configList = ();
my %rejectMap;
my %directoryMap;
my %zeroHash;

my $verbose;

my %hashmap;
my $mapname = "shadow";
my $baseconfig = "/root/config/";
my $configFile = "default";

print "starting diskmap \n";
my %searchMedia = (
  'movie1' => ['/netdrives/driveab/a/videos', '/netdrives/driveab/b/videos'],
  'movie2' => ['/netdrives/drivecd/c/videos', '/netdrives/drivecd/d/videos'],
  'movie3' => ['/netdrives/driveef/e/videos' , '/netdrives/driveef/f/videos'], 
);
my $time1 = time;

foreach my $reportname (keys %searchMedia) {
  print "report name -> $reportname "  , @{$searchMedia{$reportname}} , "\n";

  foreach my $directory (@{$searchMedia{$reportname}} ) {
    find (\&wanted, $directory);  # start searching the path 
    print $directory , "\n";
  }
}

print "writing reports ";
writeReport ("videoMediaRecords", \%hashmap);
print " video records, ";
writeReport ("videoMediaRejects", \%rejectMap);
print " rejects ";
writeReport ("videoMediaDirectories", \%directoryMap);
print " directories \n";
writeReport ("videoMediaZero", \%zeroHash);
print " zero files \n";
print "done " . (time - $time1) . "\n\n";




print "run completed " , time - $time1 , "\n\n";

sub wanted {
	my $file = $File::Find::name;
  if  (-d $file ) {
    $directoryMap{$file} = $file;  
    return;
  }
  if (-z $file) {
    $zeroHash{$file} = 1;
    return;
  }
  if ($file =~ /(AAF|3GP|GIF|MP4|AVI|CAM|DAT|M4V|mkv|mov|MPEG|MPEG4|MXF|NSV|Ogg|RM|SVI|SMI|WMV)$/i) {
    my $size = -s $file;
		if ($size) {
      $hashmap{$file} = $size;
      return;
    }
    else {
      $rejectMap{$file} = 1;  
      return;
    }
	}
  else {
    $rejectMap{$file} = 1;
    return;
  }
}

sub writeReport {
  my $reportname = shift;
	my $hashmap = shift ;
	my ($sec,$min,$hour,$mday,$mon,$year) = (localtime(time))[0,1,2,3,4,5]; 
	my $reportDir = "/opt/contentdata/";
	my $reportname = sprintf ("%s_%.4d%.2d%.2d%.2d%.2d%.2d.csv" , $reportname, ($year + 1900) , ($mon+1), $mday , $hour , $min , $sec);

  $reportname = $reportDir . $reportname;

	open (REPORT, ">$reportname") || die "can not write report $reportname because  $!\n";
		foreach my $key ( sort {$a cmp $b }  keys %$hashmap) {
			print REPORT  "$key###$hashmap{$key}\n";
		}
	close (REPORT);
}




