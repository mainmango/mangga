require 'json'

ls_files = 
"Conan/818 民工汉化:
818-00.jpg
818-01.jpg
818-02.jpg
818-03.jpg
818-04.jpg
818-05.jpg
818-06.jpg
818-07.jpg
818-08.jpg
818-09.jpg
818-10.jpg
818-11.jpg
818-12.jpg
818-13.jpg
818-14.jpg
818-15.jpg
818-16.jpg

Conan/819 民工汉化:
819-00.jpg
819-01.jpg
819-02.jpg
819-03.jpg
819-04.jpg
819-05.jpg
819-06.jpg
819-07.jpg
819-08.jpg
819-09.jpg
819-10.jpg
819-11.jpg
819-12.jpg
819-13.jpg
819-14.jpg
819-15.jpg
819-16.jpg"

folders = ls_files.split(/\n\n/) # Array of "Path: List-Of-Filenames"
folders.each do |f|
    f = f.split(':')
    keywords = f[0].split(/[\p{P},' ']/)
    puts keywords
end


#puts f.inspect
#puts keywords.inspect

#h = {"url" => "/hello/world", "keywords" => ["853","Conan","米花"]}
#puts h.to_json