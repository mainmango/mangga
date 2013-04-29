require 'json'

input = File.open(ARGV[0]).read

mngs = [] #the arrawy to hold every single URL and Keywoards

folders = input.split(/\n\n/) # Array of "Path: List-Of-Filenames"
folders.each do |f|
    f = f.split(/:\n/)
    keywords = f[0].split(/[\p{P},' ']/)
    pages = f[1].split(/\n/)
    path = "#{f[0]}/" #the relative path of the page file
    pages.each do |p|
        url = path + p
        hash = {url: url, keywords: keywords}
        mngs.push hash
    end
end
puts JSON.generate(mngs)


#puts f.inspect
#puts keywords.inspect

#h = {"url" => "/hello/world", "keywords" => ["853","Conan","米花"]}
#puts h.to_json