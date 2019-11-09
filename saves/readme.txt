Hi guys,

Welcome to my clean codeigniter project....its the first version 1.0.1 so maybe there are some bugs but I'll sertainly work on this in the future and when I add stuff.

!!!!!!!!!I will make an advanced clean_codigniter_project version  where I will Provide Datamapper use,UserAuthentication based on roles,AJAX pagination,multilanguage use and Xml readyness(I'll explain this later)!!!!!!!!!!
All setup and ready to use!
(I will document that future project aswell :D:D )

Than I hope we can use this project as starter kit for future projects so that we can work faster without al the configurations that take a bit of time.

So what I'v done at first when I downloaded the latest version of codegniter:

1)I've deleted the index.html in every folder(this is the directory acces forbidden html that is show when the user can't see this folder)
This way the folders are much cleaner and you can still make a controller to redirect to 1 specific 403 page if you need to.

2)I've made a good folder structure of the framework,I've moved up the application folder to the root of the project this way you have a clean view of what is the actual added stuff in the application
(in the application folder)and what is the framework of codeigniter (in the system folder), actually you don't have to edit in the system folder at all.

3)I've also added 4 folders for the rest of the apllication:css(styles),images(all images used by the application),js(all the javascript)
and the saves folder (this is a folder that you can specify for uploads of the users or for your generated files from the app for example for xml pdf mailtemplates etc.)



Then I started configurating it with all the good stuff in ready to use MODULES.
I also printed the autoload file from codeigniter on the welcome page so you can see whats autoloaded in the app.
Of course you can modify this at your needs for specifics apps.



\$autoload['libraries'] = array('datamapper','firephp','user_agent','calendar');<br />
\$autoload['helper'] = array('constants','url);<br />
\$autoload['plugin'] = array('js_calendar');<br />
\$autoload['config'] = array('datamapper','fireignition');<br />
\$autoload['language'] = array();<br />
\$autoload['model'] = array();<br /><br />
/* End of file autoload.php */<br />
/* Location: ./system/application/config/autoload.php */");<br />


I didn't load the database library because this is custom for every app.

Datamapper is loaded.there is an example model in the models folder.
But actualy there is no demo of datamapper in this project.this will be added in the next version.



First of all I wanted to make the project as flexible as posible...so what I first looked at was template driven approach.

I've implementet that for the views and also for the css files

The Master.css loads in al the sub css files so everything is well organized

@import url("uis.css") screen;
@import url("errors.css") screen;s
@import url("fonts.css") screen;
@import url("tags.css") screen;


The Master.php is the master template

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <?php $this->load->view("head.php"); ?>
<body>

   <div id="content">
    <?php $this->load->view("body.php"); ?>
   </div>

    <?php $this->load->view("foot.php"); ?>
</body>
</html>
this loads in the head body and foot view



lets start with the head

<head>

    <base href="<?php echo base_url();?>" />
    <title><?php echo $GLOBALS['title']; ?></title>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta name="keywords" content="<?php echo $GLOBALS['keywords']; ?>">
    <meta name="description" content="<?php echo $GLOBALS['descr']; ?>">

    <!--Global css file-->
   <link rel="stylesheet" type="text/css" href="css/Master.css" />

   <!--Global Javascript files-->
   <script src="http://www.google.com/jsapi"></script><!-- google api downloader-->
   <script type='text/javascript' src='js/jquery/jQuery.js'></script><!--Latest Jquery files-->


   <!--JAVASCRIPT AND CSS FILES FOR SPECIFIC PAGES (loaded by controllers) -->
   <?php echo ($headextra);?>

   <script type='text/javascript' src='js/Master.js'></script><!--Custom Javascript file-->
</head>

The Globals array is an array for all the global stuff of the website.
You can find it in the helpers directory

Then I've made some global js and css imports for every page to load like jQuery etc
then I load in al the modules trough the head extra var thats page specific js and css importing

You can load a module like this(for example If you want to use TinyMce on a specific page)
//TINY MCE MODULE
        $this->data['headextra'] .= $this->load->view("head/head_tinymce.php", '', true);

Also like this you can make pages very light if you don't load in the modules.
this way the website can functionate very quickly instead of loading all the js and css files on every page witch is completely unnecessary!!!!




_____________________________________________________________________________________________________________________________________________________________________
fire php:Debuging to the firebug console seemt handy so I implemented It,I made some extra mods to the profiler of codeigniter, so now this gets all send to that firephp console.
------ Profiler -------
MEMORY USAGE: 3,517,032 bytes
BENCHMARKS
URI STRING: No URI data exists
GET DATA: No GET data exists
POST DATA: No POST data exists
QUERIES: No queries were run
QUERIES (0)

        !!!!!!!!!!!VERRYY IMPORTANT IS THAT YOUR CONTROLLERS extend MY_Controller TO LET THIS DEBUGGINGMETHOD WORK!!!!!!!!!!!!!!!

ex:        $this->firephp->fb("Hellow world from firePHP");
_____________________________________________________________________________________________________________________________________________________________________
fpdf generator:seemt a very easy to use pdf generator so that is setup and ready to use.(view the demo)
ex:
    function fpdfdemo()
    {
    $this->fpdf->AddPage();
    $this->fpdf->SetFont('Arial','B',16);
    $this->fpdf->Cell(40,10,'Hello FPDF');
    $this->fpdf->Output();
    }
_____________________________________________________________________________________________________________________________________________________________________
Browser and device detection:
I've added browser and device detection in the project so that we have full control for redirecting the user if mobile or if IE6 :D
You can test this by looking at the project in diferent  browsers
_____________________________________________________________________________________________________________________________________________________________________
Javascript calender:
JS_calendar comes with codeigniter but isn't configurated for you yet....so I did that and added an example at the bottom of the welcome page.
_____________________________________________________________________________________________________________________________________________________________________






JAVASCRIPT
_____________________________________________________________________________________________________________________________________________________________________
I've installed all the good jquerry plugins and made a demo in the welcome page

off course these MODULES can be turned on and of for your use!!!!!!!!!!

  //TINY MCE MODULE
        $this->data['headextra'] .= $this->load->view("head/head_tinymce.php", '', true);

        //COLOR BOX MODULE
        $this->data['headextra'] .= $this->load->view("head/colorbox.php", '', true);

        //CUFON MODULE
        $this->data['headextra'] .= $this->load->view("head/cufon.php", '', true);
        $this->data['footextra'] .= '<script type="text/javascript" src="js/cufon/cufon.util.foot.js"></script>';

        //IE FIXES MODULE
        $this->data['headextra'] .= $this->load->view("head/iefixes.php", '', true);

        //JS_CALENDER MODULE
        $this->data['headextra'] .= '<link rel="stylesheet" type="text/css" href="css/calendar/calendar.css" />';
        //also loaded in the content for the demo at the **datepicker**

        //CUSTOMCHECKBOX MODULE
        $this->data['headextra'] .= $this->load->view("head/customCheckbox.php", '', true);

        //CUSTOMDROPDOWN MODULE
        $this->data['headextra'] .= $this->load->view("head/customDropdown.php", '', true);

        //TABLESORTING MODULE
        $this->data['headextra'] .= $this->load->view("head/tableSorter.php", '', true);

        //ACCORDION MODULE
        $this->data['headextra'] .= $this->load->view("head/accordion.php", '', true);

        //COLORPICKER MODULE
        $this->data['headextra'] .= $this->load->view("head/colorPicker.php", '', true);



