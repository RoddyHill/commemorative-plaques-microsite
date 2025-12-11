import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Edit, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCMS() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("content");
  
  // Content Management State
  const [contentDialogOpen, setContentDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [contentForm, setContentForm] = useState({
    pageId: "",
    sectionId: "",
    content: "",
    contentType: "text" as "text" | "markdown" | "html",
    displayOrder: 0,
    isActive: true,
  });

  // Media Management State
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [mediaForm, setMediaForm] = useState({
    altText: "",
    usageContext: "",
  });

  // Gallery Management State
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<any>(null);
  const [galleryForm, setGalleryForm] = useState({
    mediaAssetId: 0,
    title: "",
    description: "",
    category: "",
    displayOrder: 0,
    isActive: true,
  });

  // Queries
  const { data: allContent, refetch: refetchContent } = trpc.content.getAll.useQuery();
  const { data: allMedia, refetch: refetchMedia } = trpc.media.getAll.useQuery();
  const { data: allGallery, refetch: refetchGallery } = trpc.gallery.getAll.useQuery();

  // Mutations
  const createContent = trpc.content.create.useMutation({
    onSuccess: () => {
      toast.success("Content created successfully");
      setContentDialogOpen(false);
      refetchContent();
      resetContentForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateContent = trpc.content.update.useMutation({
    onSuccess: () => {
      toast.success("Content updated successfully");
      setContentDialogOpen(false);
      refetchContent();
      resetContentForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteContent = trpc.content.delete.useMutation({
    onSuccess: () => {
      toast.success("Content deleted successfully");
      refetchContent();
    },
    onError: (error) => toast.error(error.message),
  });

  const uploadMedia = trpc.media.upload.useMutation({
    onSuccess: () => {
      toast.success("Media uploaded successfully");
      setMediaDialogOpen(false);
      refetchMedia();
      setUploadingFile(null);
      setMediaForm({ altText: "", usageContext: "" });
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteMedia = trpc.media.delete.useMutation({
    onSuccess: () => {
      toast.success("Media deleted successfully");
      refetchMedia();
    },
    onError: (error) => toast.error(error.message),
  });

  const createGalleryItem = trpc.gallery.create.useMutation({
    onSuccess: () => {
      toast.success("Gallery item created successfully");
      setGalleryDialogOpen(false);
      refetchGallery();
      resetGalleryForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateGalleryItem = trpc.gallery.update.useMutation({
    onSuccess: () => {
      toast.success("Gallery item updated successfully");
      setGalleryDialogOpen(false);
      refetchGallery();
      resetGalleryForm();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteGalleryItem = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      toast.success("Gallery item deleted successfully");
      refetchGallery();
    },
    onError: (error) => toast.error(error.message),
  });

  // Helper Functions
  const resetContentForm = () => {
    setContentForm({
      pageId: "",
      sectionId: "",
      content: "",
      contentType: "text",
      displayOrder: 0,
      isActive: true,
    });
    setEditingContent(null);
  };

  const resetGalleryForm = () => {
    setGalleryForm({
      mediaAssetId: 0,
      title: "",
      description: "",
      category: "",
      displayOrder: 0,
      isActive: true,
    });
    setEditingGallery(null);
  };

  const handleContentSubmit = () => {
    if (editingContent) {
      updateContent.mutate({ id: editingContent.id, ...contentForm });
    } else {
      createContent.mutate(contentForm);
    }
  };

  const handleMediaUpload = async () => {
    if (!uploadingFile) {
      toast.error("Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result?.toString().split(",")[1];
      if (!base64) {
        toast.error("Failed to read file");
        return;
      }

      uploadMedia.mutate({
        filename: uploadingFile.name,
        fileData: base64,
        mimeType: uploadingFile.type,
        altText: mediaForm.altText,
        usageContext: mediaForm.usageContext,
      });
    };
    reader.readAsDataURL(uploadingFile);
  };

  const handleGallerySubmit = () => {
    if (editingGallery) {
      updateGalleryItem.mutate({ id: editingGallery.id, ...galleryForm });
    } else {
      createGalleryItem.mutate(galleryForm);
    }
  };

  if (loading) {
    return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  }

  if (!user || user.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You need admin privileges to access the CMS.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Content Management System</h1>
          <p className="text-muted-foreground">Manage your website content, images, and gallery</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="content">Page Content</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Page Content</h2>
              <Dialog open={contentDialogOpen} onOpenChange={setContentDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetContentForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingContent ? "Edit Content" : "Add New Content"}</DialogTitle>
                    <DialogDescription>
                      {editingContent ? "Update existing content block" : "Create a new content block for a page"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pageId">Page ID</Label>
                        <Input
                          id="pageId"
                          value={contentForm.pageId}
                          onChange={(e) => setContentForm({ ...contentForm, pageId: e.target.value })}
                          placeholder="e.g., home, commemorative-plaques"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sectionId">Section ID</Label>
                        <Input
                          id="sectionId"
                          value={contentForm.sectionId}
                          onChange={(e) => setContentForm({ ...contentForm, sectionId: e.target.value })}
                          placeholder="e.g., hero-title, feature-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={contentForm.content}
                        onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                        rows={6}
                        placeholder="Enter your content here..."
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="contentType">Content Type</Label>
                        <Select
                          value={contentForm.contentType}
                          onValueChange={(value: "text" | "markdown" | "html") =>
                            setContentForm({ ...contentForm, contentType: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="markdown">Markdown</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="displayOrder">Display Order</Label>
                        <Input
                          id="displayOrder"
                          type="number"
                          value={contentForm.displayOrder}
                          onChange={(e) => setContentForm({ ...contentForm, displayOrder: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-8">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={contentForm.isActive}
                          onChange={(e) => setContentForm({ ...contentForm, isActive: e.target.checked })}
                          className="rounded"
                        />
                        <Label htmlFor="isActive">Active</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setContentDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleContentSubmit}>
                      {editingContent ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {allContent?.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {item.pageId} / {item.sectionId}
                        </CardTitle>
                        <CardDescription>
                          {item.contentType} • Order: {item.displayOrder} • {item.isActive ? "Active" : "Inactive"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingContent(item);
                            setContentForm({
                              pageId: item.pageId,
                              sectionId: item.sectionId,
                              content: item.content,
                              contentType: item.contentType,
                              displayOrder: item.displayOrder,
                              isActive: item.isActive,
                            });
                            setContentDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this content?")) {
                              deleteContent.mutate({ id: item.id });
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Media Library Tab */}
          <TabsContent value="media" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Media Library</h2>
              <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Media</DialogTitle>
                    <DialogDescription>Upload an image or media file to your library</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="file">File</Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setUploadingFile(e.target.files?.[0] || null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="altText">Alt Text</Label>
                      <Input
                        id="altText"
                        value={mediaForm.altText}
                        onChange={(e) => setMediaForm({ ...mediaForm, altText: e.target.value })}
                        placeholder="Describe the image for accessibility"
                      />
                    </div>
                    <div>
                      <Label htmlFor="usageContext">Usage Context</Label>
                      <Input
                        id="usageContext"
                        value={mediaForm.usageContext}
                        onChange={(e) => setMediaForm({ ...mediaForm, usageContext: e.target.value })}
                        placeholder="e.g., home-hero, gallery"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setMediaDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleMediaUpload} disabled={!uploadingFile}>
                      Upload
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allMedia?.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <img src={item.url} alt={item.altText || item.filename} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{item.filename}</p>
                    <p className="text-xs text-muted-foreground">{item.usageContext || "No context"}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this media?")) {
                            deleteMedia.mutate({ id: item.id });
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Management Tab */}
          <TabsContent value="gallery" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gallery Items</h2>
              <Dialog open={galleryDialogOpen} onOpenChange={setGalleryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetGalleryForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Gallery Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingGallery ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle>
                    <DialogDescription>
                      {editingGallery ? "Update gallery item details" : "Add a new item to the gallery"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="mediaAssetId">Media Asset ID</Label>
                      <Input
                        id="mediaAssetId"
                        type="number"
                        value={galleryForm.mediaAssetId}
                        onChange={(e) => setGalleryForm({ ...galleryForm, mediaAssetId: parseInt(e.target.value) })}
                        placeholder="Enter media asset ID"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload media first, then use its ID here
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        placeholder="Project description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                          placeholder="e.g., slate, bronze"
                        />
                      </div>
                      <div>
                        <Label htmlFor="galleryDisplayOrder">Display Order</Label>
                        <Input
                          id="galleryDisplayOrder"
                          type="number"
                          value={galleryForm.displayOrder}
                          onChange={(e) => setGalleryForm({ ...galleryForm, displayOrder: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="galleryIsActive"
                        checked={galleryForm.isActive}
                        onChange={(e) => setGalleryForm({ ...galleryForm, isActive: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="galleryIsActive">Active</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setGalleryDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleGallerySubmit}>
                      {editingGallery ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {allGallery?.map((item) => (
                <Card key={item.id}>
                  <div className="flex gap-4">
                    <div className="w-32 h-32 bg-muted flex-shrink-0">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.altText || item.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.category} • Order: {item.displayOrder}</p>
                          <p className="text-sm mt-2">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingGallery(item);
                              setGalleryForm({
                                mediaAssetId: item.mediaAssetId,
                                title: item.title,
                                description: item.description || "",
                                category: item.category || "",
                                displayOrder: item.displayOrder,
                                isActive: item.isActive,
                              });
                              setGalleryDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this gallery item?")) {
                                deleteGalleryItem.mutate({ id: item.id });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
