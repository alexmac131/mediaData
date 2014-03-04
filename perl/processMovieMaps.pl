#!/usr/bin/perl
use Data::Dumper;
use IMDB::Film;
use Text::Aspell;
use File::Basename;
use JSON;

require Filtered;
my $speller = Text::Aspell->new() || die "Can not create speller object $!";
$speller->set_option('lang','en_US');
$speller->set_option('sug-mode','fast');

my %wordmap;
my %names;
my %dup;
$| = 1;

my %beH = ( 

	1 => "bad dump",
	2 => "needs folder",
	3 => "good",
	4 => "season",
	5 => "bad filing",
	6 => "bad filing",
	7 => "bad filing",
);


my %rawdata_config = (
	"mountpoint" => 1,
	"drivegroup" => 2,
	"drive" => 3,
	"mediatype" => 4,
);

my $contentDir = "/opt/contentdata/";
my %types;
my $countt;
my @recordsbucket;

my $md= "/var/www/movies/";
my $index = "index.html";

# read the directory for files 
opendir (MAPS, $contentDir) || die "can not open data file \n";
	my @maplist = readdir(MAPS);
closedir(MAPS);
my @filelist = grep {/videoMediaRecords/i} @maplist;

$filemap = $filelist[0];

#load the rawfile file into the db
open (MAP_FILE ,$contentDir . $filemap) || die "Can not open a map file for reading $file $!";
while (my $line = <MAP_FILE>) {
	chomp ($line);
	push (@file, $line);     # we have a list of files 
}
close MAP_FILE;


foreach my $line (@file) {

	next if $line =~ /^$/;
	next if $line =~ /sample/i;
	chomp($line);
	## base --> the full path to the file and file
	## size is the file size
	my ($base, $size) = split("###", $line);
	$base =~ /^(\/\w{1,}\/\w{1,}\/\w{1,}\/)/;
	my $basedrive = $1;  # base drive  /netdrives/drivecd/d/
	$base =~ /^$basedrive(.*)/;
	my $rawContent =  $1 ;  # 
	my $rawCount = $rawContent;  # we use this raw count to protect the rawContent from the tr
	$count = ($rawCount  =~ tr /\///   );
	next if length ($rawContent) == 0;
	@parts = split(/\//, $rawContent);  # parts is the files all but the basedrive
	$index = scalar(@parts) - 1;

	# if tv  elsif movie elsif edu else unfiled 
	if ($base =~ /tv/) {
		$mediaType = "tv";

	}
	elsif ($base =~ /movie/) {
		$mediaType = "movie";

	}
	elsif ($base =~ /educ/) {
		$mediaType = "edu";

	}
	elsif ($base =~ /dump/) {
		$mediaType = "dumped";

	}
	else {
		$mediaType = "unfiled";

	}


	$placementState = $beH{$count};	

	$file  = $parts[$index];
	$rawFile = $file; # save original
	$dotCount =   ($rawFile  =~ tr /\.//   );
	$fileType = lc((@tmp = split(/\./, $file))[$dotCount]);
	
	$types{$fileType}++;  #counting the file type 
	chomp($file);
	$file =~ s/\.(AAF|3GP|GIF|MP4|AVI|CAM|DAT|BRRIP|M4V|mkv|mov|MPEG|MPEG4|MXF|NSV|Ogg|RM|SVI|SMI|WMA)$//gi ;
	"beeraaaa"  =~ /(aarwsgww21414141141)/;
	my $workingCopy = $file;
	$workingCopy =~ s/_/ /;
	$workingCopy =~ s/_{2,}/ /g;
	$workingCopy =~ s/^ //;
	$workingCopy =~ s/-{1,}/ /g;
	$workingCopy =~ s/\.{1,}/ /g;
	$workingCopy  =~ s/_{1,}/ /g;

	$workingCopy =~ /^(.*)(HDTV|xvid|ppvrip|dvdrip|bdrip|BRRIP|dvdscr|divx|PDTV|BRRIP|Dispossessed|FreeVideoLecturesDOTcom|PREAiR)/i;
        my $tmpStr = $1;
	my $baseTest = $2;
	"beeraaaa"  =~ /(aarwsgww21414141141)/;
	#print "m--> ", $tmpStr, "\n";
	if ($baseTest)  {
		#print "w $workingCopy  $baseTest\n";
		$workingCopy = $tmpStr;
		#print "w $workingCopy \n";
		$workingCopy =~ s/(\W{1,}|_{1,})$//g;
		#print "w $workingCopy \n";
		$tmpStr = "";
		$workingCopy =~ /^(.*)(HDTV|xvid|ppvrip|dvdrip|bdrip|BRRIP|dvdscr|divx|PDTV|BRRIP|PREAiR)/i;
         	$tmpStr = $1;
		$baseTest = $2;
		if ($baseTest)  {
			#print "-> 1w $workingCopy  $baseTest\n";
			$workingCopy = $tmpStr;
			#print "-> 2w $workingCopy \n";
			$workingCopy =~ s/(\W{1,}|_{1,})$//g;
			#print "-> 3w $workingCopy \n";
			"beeraaaa"  =~ /(aarwsgww21414141141)/;
		}
	}
			
	# get the year if any
	$workingCopy =~ /([12][09]\d{2})/m;
	my $year = $1;
	"beeraaaa"  =~ /(aarwsgww21414141141)/;
	if ($year !~ /^\d{1,}$/) {
		$year = "";
	}
	$workingCopy =~ /[sS](\d{1,3})[eE](\d{1,3})/;
	my $season = $1;
	$episode = $2;
	"beeraaaa"  =~ /(aarwsgww21414141141)/;
	if (!$season) {
		$workingCopy =~ /(\d{1,3})x(\d{1,3})/;
		$season = $1;
		$episode = $2;
	}
	if (!$season || $season >= 50 || $season =~ /\D/) {
		$season = "";
		$episode = "",
	}
	if  (!$year) {
		$year = "";
	}
	push (@arrayList,  { 
		"raw" => $base,
		"nasdrive" => getNas($basedrive), 
		"drive" => $basedrive,
		"filename" => $workingCopy,
		"mediaType" => $mediaType,
		"series" => $season,
		"year" => $year,
		"status" => $placementState,
		"season" => $season,
		"espisode" =>  $episode,
		"datapoints" => [@parts],
		"extension" => $fileType,
		"size" => $size,
		'id' => ++$cc,}
	);
}

# generate our data points 
# word list  search able index to id  ## word index 
# id move list
# genere list to id  // scrape and taxometry  // get move lists if possible for each area
# @words --- id push 
foreach my $ref  (@arrayList) {
	#print $ref->{filename} , "\n";
	#print $ref->{raw} , "\n";
	my @words = "";
	foreach my $key (keys $ref) {
		#print  "\t$key $ref->{$key}  \n";
		if ($key eq  "datapoints") {
			my $points = 0;
			my $endpoint = scalar  @{$ref->{datapoints}}  - 3 ; 
			foreach my $subkey (@{$ref->{datapoints}}) 	{
				if (($points > 2)  && ($points < $endpoint)) {
					my @tmp = split (/(\W|_)/, $subkey);
					@tmp = grep(!/\d/, @tmp);

					@tmp = map {lc} (@tmp);
					push (@words, @tmp);
				}
				$points++;
			}
		}
		if ($key eq "filename") {
			my @tmp = split (/(\W|_)/, $ref->{filename});
			@tmp = grep(!/\d/, @tmp);
			#print "---> $ref->{filename} \n"; 
			@tmp = map {lc} @tmp;
			push (@words, @tmp);

		}
	}
	#print " $ref->{filename}  $ref->{id} \n";
	loadWords ($ref->{id}, \@words);
	@word = [];
	#exit if $ref->{id} > 500;
}



foreach my $key (keys %wordmap) {
	$keytest = $key . "s";
	my $lentest = length $key;
	if ($lentest <= 2) {
		delete($wordmap{$key});
		next;

	}
}
foreach my $key (keys %wordmap) {
	chop ($wordmap{$key});

	push (@arrayWords,  { 
		"label" => $key,
		"id" => $wordmap{$key},
		}
	);

	
}

# not happy with its format so lets smack workmap around a bit

	my $json = JSON->new->allow_nonref;
 	my $master_text   = to_json( \@arrayList, {utf8 => 1, pretty => 1}  );


	open (FILE, ">>/var/www/mediaPlayer/data/master.json") || die "unable to open file $!";
	print FILE "var masterMovie = ";
	print FILE $master_text;
	close (FILE);

	#print "];";

	
	

sub loadWords {
 	my $id = shift;
	my $rawwords = shift;
	#print $id, "\n";;
	foreach my $tmp (@$rawwords) {
		next if $tmp =~ /^$/;
		next if $tmp =~ /^\d{1,3}$/;
		next if length $tmp < 2;
		#print "\t\t $tmp \n";
		if (exists ($wordmap{$tmp})) { 
			if ($wordmap{$tmp} =~ /$id/) {
				# we have already
				next;	
			}
			else {
				$wordmap{$tmp} .= "$id,";
			}
		}
		else {
			$wordmap{$tmp} .= "$id,";

		}
		
	}
}


 exit;
	


# behaviour properties
# folders 1 ->   unfiled 
# folders 2 -> dumped in base areas  movies  tvshows for example
# folders 3 -> filed in base area and show header area item three is the base header 
# folders 4 -> as per 3 plus likely the seaon folder 
# folders 5 or greater notes

#folder 5 it is odd , this lis likely a base area dump of same shows.
#    	example woould be gold rush shows







#my $moviesdir = "/var/www/movies/";
#my $htmlindex = "index.html";

sub openHTML {
	my $htmlHash = shift;
	#print "$htmlHash->{baseDir} . $htmlHash->{subpath} . $htmlHash->{name} . $htmlHash->{ext}\n";
	open (FILEHANDLE, ">" .$htmlHash->{baseDir} . $htmlHash->{subpath} . $htmlHash->{name} . $htmlHash->{ext}) || die " $htmlHash->{baseDir} . $htmlHash->{subpath} . $htmlHash->{name} dunable to create html file because $!";
	print FILEHANDLE "<html>\n<body><center> $name </center>\n";



	
	return FILEHANDLE;

}	


sub getNas {
	my $rawaa = shift;

	my %nasLookUp = ( 
		'driveab/a' => "movie1 volume 2",
		'driveab/b' => "movie1 volume 1",
		'drivecd/c' => "movie2 volume 1",
		'drivecd/d' => "movie2 volume 2",
		'driveef/e' => "movie3 volume 2",
		'driveef/f' => "movie3 volume 1",
	);
	foreach my $tmp (keys %nasLookUp) {
		if ($rawaa =~  /$tmp/) {
			return $nasLookUp{$tmp};
		}
	}

}
